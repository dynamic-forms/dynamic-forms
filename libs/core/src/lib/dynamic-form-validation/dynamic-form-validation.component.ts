import { Component } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormValidationErrors } from './dynamic-form-validation-errors';
import { DynamicFormValidationService } from './dynamic-form-validation.service';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html',
  styleUrls: ['./dynamic-form-validation.component.scss']
})
export class DynamicFormValidationComponent<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormFieldBase<Field> {

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
