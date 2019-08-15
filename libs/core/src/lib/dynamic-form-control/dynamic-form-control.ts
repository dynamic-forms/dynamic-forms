import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicFormFieldEvaluator } from '../dynamic-form-evaluation/dynamic-form-field-evaluator';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';
import { DynamicFormControlValidator } from './dynamic-form-control-validator';

export type DynamicFormControlEvaluator<FormInput extends DynamicFormInput = DynamicFormInput> =
  DynamicFormFieldEvaluator<DynamicFormControl<FormInput>>;

export class DynamicFormControl<FormInput extends DynamicFormInput = DynamicFormInput> extends DynamicFormField<
  FormControl, DynamicFormControlTemplate<FormInput>, DynamicFormControlDefinition<FormInput>> {

  protected _valueSubscription: Subscription;
  protected _evaluators: DynamicFormControlEvaluator[] = [];
  protected _validators: DynamicFormControlValidator[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition<FormInput>) {
    super(root, parent, definition);
    this._model = this.getInitialModel();
    this._control = new FormControl(this._model);
    this._valueSubscription = this._control.valueChanges.subscribe(value => {
      this.parent.model[this.definition.key] = value;
      this._model = this.parent.model[this.definition.key];
    });
  }

  get evaluators() { return this._evaluators; }
  get validators() { return this._validators; }

  setEvaluators(evaluators: DynamicFormControlEvaluator[]) {
    this._evaluators = evaluators || [];
  }

  setValidators(validators: DynamicFormControlValidator[]) {
    this._validators = validators || [];
    this._control.setValidators(this.getValidatorFunctions());
  }

  check() {
    this.checkValue();
    this.checkControl();
    this.checkValidators();
  }

  destroy() {
    this._valueSubscription.unsubscribe();
  }

  reset() {
    this._control.reset(null);
  }

  resetDefault() {
    const defaultValue = this.getDefaultValue();
    this._control.reset(defaultValue);
  }

  validate() {
    this._control.markAsTouched();
  }

  private getInitialModel() {
    const key = this.definition.key;
    if (this.parent.model[key] === undefined) {
      this.parent.model[key] = this.getDefaultValue();
    }
    return this.parent.model[key];
  }

  private getDefaultValue() {
    const input = this.definition.template.input;
    return input && input.defaultValue !== undefined ? input.defaultValue : null;
  }

  private getValidatorFunctions() {
    return this._validators.filter(validator => validator.enabled)
      .map(validator => validator.validatorFn);
  }

  private checkValue() {
    this._evaluators.forEach(evaluator => evaluator.func(this));
  }

  private checkControl(): void {
    const disabled = this.parent.control.disabled || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  private checkValidators() {
    const validatorsChanged = this.validatorsChanged();
    if (validatorsChanged) {
      this.control.setValidators(this.getValidatorFunctions());
      this.control.updateValueAndValidity();
    }
  }

  private validatorsChanged(): boolean {
    return this._validators.some(validator => {
      const enabled = this.template.validation[validator.key];
      const value = this.template.input[validator.key];
      if (validator.enabled !== enabled || validator.value !== value) {
        validator.enabled = enabled;
        validator.value = value;
        validator.validatorFn = enabled ? validator.factory(value) : null;
        return true;
      }
      return false;
    });
  }
}
