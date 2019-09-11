import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';

@Injectable()
export class DynamicFormValidationBuilder {
  createControlValidators(template: DynamicFormControlTemplate) {
    return template.validation ? Object.keys(template.validation).map(key => {
      return this.createControlValidator(template, key);
    }).filter(validator => !!validator) : [];
  }

  createControlValidator(template: DynamicFormControlTemplate, key: string): DynamicFormControlValidator {
    if (!(template && typeof template.validation[key] === 'boolean')) {
      return undefined;
    }

    const factory = this.getControlValidatorFactory(key);
    return factory ? new DynamicFormControlValidator(key, template, factory) : undefined;
  }

  private getControlValidatorFactory(key: string): (parameters: any) => ValidatorFn {
    switch (key) {
      case 'required':
        return _ => Validators.required;
      case 'email':
        return _ => Validators.email;
      case 'pattern':
        return (pattern?: string | RegExp) => pattern ? Validators.pattern(pattern) : undefined;
      case 'min':
        return (min?: number) => Number.isFinite(min) ? Validators.min(min) : undefined;
      case 'max':
        return (max?: number) => Number.isFinite(max) ? Validators.max(max) : undefined;
      case 'minLength':
        return (minLength?: number) => Number.isFinite(minLength) ? Validators.minLength(minLength) : undefined;
      case 'maxLength':
        return (maxLength?: number) => Number.isFinite(maxLength) ? Validators.maxLength(maxLength) : undefined;
      default:
        return undefined;
    }
  }
}
