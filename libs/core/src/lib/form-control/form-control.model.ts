import { FormControl, ValidatorFn } from '@angular/forms';
import { FormField, FormFieldTemplate } from '../form-field/form-field.model';
import { FormControlInput } from './form-input/form-input.model';
import { FormValidation } from '../form-validation/form-validation.model';
import { Subscription } from 'rxjs';

export interface FormControlValidation extends FormValidation {
  required?: boolean;
  email?: boolean;
  pattern?: boolean;
  min?: boolean;
  max?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
}

export interface FormControlTemplate extends FormFieldTemplate {
  input: FormControlInput;
  validation: FormControlValidation;
}

export class FormControlField extends FormField<FormControlTemplate, FormControl> {
  protected _controlValueSubscription: Subscription;

  constructor(root: FormField, parent: FormField, template: FormControlTemplate) {
    super(root, parent, template);
    this._model = this.getModel(parent, template);
    this._control = new FormControl(this._model);
    this._controlValueSubscription = this._control.valueChanges.subscribe(value => {
      this.parent.model[this.template.key] = value;
      this._model = value;
    });
  }

  setValidators(validators: ValidatorFn[]) {
    this._control.setValidators(validators);
  }

  update() {
    this.updateControl();
  }

  destroy() {
    this._controlValueSubscription.unsubscribe();
  }

  private getModel(parent: FormField, template: FormFieldTemplate): any {
    parent.model[template.key] = parent.model[template.key] || null;
    return parent.model[template.key];
  }

  private updateControl(): void {
    const disabled = this.template.input.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}
