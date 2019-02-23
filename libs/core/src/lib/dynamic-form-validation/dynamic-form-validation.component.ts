import { Component, Input } from '@angular/core';
import { DynamicFormConfigService } from '../dynamic-form/dynamic-form-config.service';
import { FormValidationErrors } from './form-validation-errors';

@Component({
  selector: 'dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html',
  styleUrls: ['./dynamic-form-validation.component.scss']
})
export class DynamicFormValidationComponent {
  @Input() errors: FormValidationErrors;

  constructor(private configService: DynamicFormConfigService) {}

  get message() {
    const key = Object.keys(this.errors)[0];
    const error = this.errors[key];
    return error && error.message ? error.message : this.getMessage(key);
  }

  private getMessage(key: string) {
    const config = this.configService.getValidationConfig();
    return config.messages[key] || config.defaultMessage;
  }
}
