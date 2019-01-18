import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormValidationConfig } from './form-validation.model';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './form-validation.component.html'
})
export class FormValidationComponent {
  private readonly defaultValidationMessage = 'The field is invalid.';
  private readonly validationConfig: FormValidationConfig = {
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minLength: 'The field does not fit the min length',
      maxLength: 'The field does not fit the max length',
    }
  };

  @Input() errors: ValidationErrors;

  get message(): string {
    const error = Object.keys(this.errors)[0];
    if (error && this.validationConfig.messages[error]) {
      return this.validationConfig.messages[error];
    }

    return this.defaultValidationMessage;
  }
}
