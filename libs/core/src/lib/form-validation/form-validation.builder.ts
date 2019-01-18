import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { FormValidation } from './form-validation.model';

@Injectable()
export class FormValidationBuilder {
  getValidator(validation: FormValidation, key: string, value?: any): ValidatorFn {
    switch (key) {
      case 'required':
        return validation.required ? Validators.required : null;
      case 'email':
        return validation.required ? Validators.email : null;
      case 'pattern':
        return validation.pattern ? Validators.pattern(value) : null;
      case 'min':
        return validation.min ? Validators.min(value) : null;
      case 'max':
        return validation.max ? Validators.max(value) : null;
      case 'minLength':
        return validation.minLength ? Validators.minLength(value) : null;
      case 'maxLength':
        return validation.maxLength ? Validators.maxLength(value) : null;
      default:
        return null;
    }
  }
}
