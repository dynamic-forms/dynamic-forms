import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { FormControlTemplate, FormControlValidators, FormControlField } from './form-control.model';

@Injectable()
export class FormControlBuilder {
  createFormField(template: FormControlTemplate, parentModel: any): FormControlField {
    const model = parentModel ? parentModel[template.key] : null;
    const validators = this.getValidators(template);
    const control = new FormControl(model, validators);
    return new FormControlField(template, control, parentModel, model);
  }

  private getValidators(template: FormControlTemplate): ValidatorFn[] {
    if (template.validators) {
      return Object.keys(template.validators)
        .map(key => this.getValidator(template.validators, key));
    }
    return [];
  }

  private getValidator(validators: FormControlValidators, key: string): ValidatorFn {
    switch (key) {
      case 'required':
        return Validators.required;
      case 'email':
        return Validators.email;
      case 'pattern':
        return Validators.pattern(validators.pattern);
      case 'min':
        return Validators.min(validators.min);
      case 'max':
        return Validators.max(validators.max);
      case 'min':
        return Validators.minLength(validators.minLength);
      case 'max':
        return Validators.maxLength(validators.maxLength);
      default:
        return null;
    }
  }
}
