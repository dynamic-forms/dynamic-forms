import { Component, Input, Inject } from '@angular/core';
import { FormValidationErrors } from './form-validation.model';
import { FormValidationConfig } from './form-validation.config';
import { FormConfig, FORM_CONFIG } from '../form/form.config';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './form-validation.component.html'
})
export class FormValidationComponent {
  private readonly config: FormValidationConfig;

  @Input()
  errors: FormValidationErrors;

  constructor(@Inject(FORM_CONFIG) formConfig: FormConfig) {
    this.config = formConfig.validationConfig;
  }

  get message() {
    const key = Object.keys(this.errors)[0];
    if (key) {
      const error = this.errors[key];
      return error.message || this.config.messages[key] || this.config.defaultMessage;
    }

    return this.config.defaultMessage;
  }
}
