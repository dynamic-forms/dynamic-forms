import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { FormControlValidation } from './form-validation.model';

@Injectable()
export class FormValidationBuilder {
  getValidators(validation: FormControlValidation): ValidatorFn[] {
    if (validation) {
      return Object.keys(validation)
        .map(key => this.getValidator(validation, key))
        .filter(validator => !!validator);
    }
    return [];
  }

  private getValidator(validation: FormControlValidation, key: string): ValidatorFn {
    switch (key) {
      case 'required':
        return validation.required ? Validators.required : null;
      case 'email':
        return validation.email ? Validators.email : null;
      case 'pattern':
        return validation.pattern ? Validators.pattern(validation.pattern) : null;
      case 'min':
        return Number.isFinite(validation.min) ? Validators.min(validation.min) : null;
      case 'max':
        return Number.isFinite(validation.max) ? Validators.max(validation.max) : null;
      case 'minLength':
        return Number.isFinite(validation.minLength) ? Validators.minLength(validation.minLength) : null;
      case 'maxLength':
        return Number.isFinite(validation.minLength) ? Validators.maxLength(validation.maxLength) : null;
      default:
        return null;
    }
  }
}
