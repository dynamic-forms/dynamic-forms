import { Component } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationErrors } from './dynamic-form-validation-errors';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html'
})
export class DynamicFormValidationComponent<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormFieldWrapper<Field> {

  constructor(protected validationService: DynamicFormValidationService) {
    super();
  }

  get errors(): DynamicFormValidationErrors {
    return this.control.errors;
  }

  get errorMessage() {
    return this.validationService.getErrorMessage(this.errors);
  }

  get showErrorMessage() {
    return this.control.touched && this.errors && true;
  }
}
