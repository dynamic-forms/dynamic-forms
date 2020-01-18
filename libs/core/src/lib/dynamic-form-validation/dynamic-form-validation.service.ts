import { Injectable } from '@angular/core';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormValidationErrors } from './dynamic-form-validation-errors';

@Injectable()
export class DynamicFormValidationService {
  constructor(protected configService: DynamicFormConfigService) {}

  getErrorMessage(errors: DynamicFormValidationErrors) {
    if (!errors) {
      return null;
    }

    const keys = Object.keys(errors);
    if (!keys.length) {
      return this.getDefaultErrorMessage();
    }

    const errorKey = keys[0];
    const error = errors[errorKey];
    return error && error.message ? error.message : this.getErrorMessageFromConfig(errorKey);
  }

  private getErrorMessageFromConfig(errorKey: string) {
    const config = this.configService.validationConfig;
    return config.messages[errorKey] || config.defaultMessage;
  }

  private getDefaultErrorMessage() {
    const config = this.configService.validationConfig;
    return config.defaultMessage;
  }
}
