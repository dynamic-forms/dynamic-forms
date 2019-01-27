import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class FormValidationBuilder {
  getValidatorFactory(key: string): (enabled: boolean, value: any) => ValidatorFn {
    switch (key) {
      case 'required':
        return (enabled: boolean, _: boolean) => enabled ? Validators.required : null;
      case 'email':
        return (enabled: boolean, _: boolean) => enabled ? Validators.email : null;
      case 'pattern':
        return (enabled: boolean, pattern?: string | RegExp) => enabled ? Validators.pattern(pattern) : null;
      case 'min':
        return (enabled: boolean, min?: number) => enabled ? Validators.min(min) : null;
      case 'max':
        return (enabled: boolean, max?: number) => enabled ? Validators.min(max) : null;
      case 'minLength':
        return (enabled: boolean, minLength?: number) => enabled ? Validators.minLength(minLength) : null;
      case 'maxLength':
        return (enabled: boolean, maxLength?: number) => enabled ? Validators.maxLength(maxLength) : null;
      default:
        return null;
    }
  }
}
