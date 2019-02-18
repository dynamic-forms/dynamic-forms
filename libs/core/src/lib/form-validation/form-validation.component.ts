import { Component, Input } from '@angular/core';
import { FormConfigService } from '../form/form-config.service';
import { FormValidationErrors } from './form-validation-errors';

@Component({
  selector: 'core-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent {
  @Input() errors: FormValidationErrors;

  constructor(private formConfigService: FormConfigService) {}

  get message() {
    const key = Object.keys(this.errors)[0];
    const error = this.errors[key];
    return error && error.message ? error.message : this.getMessage(key);
  }

  private getMessage(key: string) {
    const config = this.formConfigService.getValidationConfig();
    return config.messages[key] || config.defaultMessage;
  }
}
