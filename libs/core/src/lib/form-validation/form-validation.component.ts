import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FormValidationConfig, defaultFormValidationConfig } from './form-validation.config';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './form-validation.component.html'
})
export class FormValidationComponent {
  private readonly config: FormValidationConfig = defaultFormValidationConfig;

  @Input() errors: ValidationErrors;

  get message(): string {
    const error = Object.keys(this.errors)[0];
    if (error && this.config.messages[error]) {
      return this.config.messages[error];
    }

    return this.config.defaultMessage;
  }
}
