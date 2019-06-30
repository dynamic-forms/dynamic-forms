import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

export class DynamicFormControl<FormInput extends DynamicFormInput = DynamicFormInput> extends DynamicFormField<
  FormControl, DynamicFormControlTemplate<FormInput>, DynamicFormControlDefinition<FormInput>> {

  protected _controlValue: Subscription;
  protected _validators: DynamicFormControlValidator[];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition<FormInput>) {
    super(root, parent, definition);
    this._model = this.getModel(parent, definition);
    this._control = new FormControl(this._model);
    this._controlValue = this._control.valueChanges.subscribe(value => {
      this.parent.model[this.definition.key] = value;
      this._model = this.parent.model[this.definition.key];
    });
  }

  setValidators(validators: DynamicFormControlValidator[]) {
    this._validators = validators;
    this._control.setValidators(this.getControlValidators());
  }

  check() {
    this.checkControlValue();
    this.checkControlStatus();
    this.checkControlValidators();
  }

  destroy() {
    this._controlValue.unsubscribe();
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormControlDefinition<FormInput>): any {
    if (parent.model[definition.key] === undefined) {
      parent.model[definition.key] = this.getDefaultValue(definition.template.input);
    }
    return parent.model[definition.key];
  }

  private getDefaultValue(input: FormInput) {
    return input && input.defaultValue !== undefined ? input.defaultValue : null;
  }

  private getControlValidators() {
    return (this._validators || []).filter(validator => validator.enabled)
      .map(validator => validator.validator);
  }

  private checkControlValue() {
    if (this.template.input.type === 'dropdown') {
      const hasOption = (this.template.input.options || []).some(option => {
        if (option.items) {
          return option.items.some(item => item.value === this.model);
        }
        return option.value === this.model;
      });
      if (!hasOption) {
        this.control.setValue(null);
      }
    }
  }

  private checkControlStatus(): void {
    const disabled = this.parent.control.disabled || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  private checkControlValidators() {
    const validatorsChanged = this.validatorsChanged();
    if (validatorsChanged) {
      this.control.setValidators(this.getControlValidators());
      this.control.updateValueAndValidity();
    }
  }

  private validatorsChanged(): boolean {
    return (this._validators || []).some(validator => {
      const enabled = this.template.validation[validator.key];
      const value = this.template.input[validator.key];
      if (validator.enabled !== enabled || validator.value !== value) {
        validator.enabled = enabled;
        validator.value = value;
        validator.validator = enabled ? validator.factory(value) : null;
        return true;
      }
      return false;
    });
  }
}
