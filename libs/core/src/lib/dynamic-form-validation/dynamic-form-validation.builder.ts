import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';

@Injectable()
export class DynamicFormValidationBuilder {
  getValidatorFactory(key: string): (value: any) => ValidatorFn {
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
