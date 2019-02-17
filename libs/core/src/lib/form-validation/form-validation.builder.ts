import { Injectable } from '@angular/core';
import { Validators, ValidatorFn } from '@angular/forms';

@Injectable()
export class FormValidationBuilder {
  getValidatorFactory(key: string): (value: any) => ValidatorFn {
    switch (key) {
      case 'required':
        return _ => Validators.required;
      case 'email':
        return _ => Validators.email;
      case 'pattern':
        return (pattern?: string | RegExp) => pattern ? Validators.pattern(pattern) : null;
      case 'min':
        return (min?: number) => Number.isFinite(min) ? Validators.min(min) : null;
      case 'max':
        return (max?: number) => Number.isFinite(max) ? Validators.min(max) : null;
      case 'minLength':
        return (minLength?: number) => Number.isFinite(minLength) ? Validators.minLength(minLength) : null;
      case 'maxLength':
        return (maxLength?: number) => Number.isFinite(maxLength) ? Validators.maxLength(maxLength) : null;
      default:
        return null;
    }
  }
}
