import { Injectable } from '@angular/core';
import { ValidatorFn, FormControl, Validators } from '@angular/forms';
import { FormControlTemplate, FormControlValidators, FormControlField } from './form-control.model';

@Injectable()
export class FormControlBuilder {
  createFormField(template: FormControlTemplate, parentPath: string, parentModel: any): FormControlField {
    const path = parentPath ? `${parentPath}.${template.key}` : template.key;
    const model = parentModel ? parentModel[template.key] : null;
    const validators = this.getValidators(template);
    const control = new FormControl(model, validators);
    return new FormControlField(path, template, control, parentModel, model);
  }

  private getValidators(template: FormControlTemplate): ValidatorFn[] {
    if (template.validators) {
      return Object.keys(template.validators)
        .map(key => this.getValidator(template.validators, key))
        .filter(validator => !!validator);
    }
    return [];
  }

  private getValidator(validators: FormControlValidators, key: string): ValidatorFn {
    switch (key) {
      case 'required':
        return validators.required ? Validators.required : null;
      case 'email':
        return validators.email ? Validators.email : null;
      case 'pattern':
        return validators.pattern ? Validators.pattern(validators.pattern) : null;
      case 'min':
        return Number.isFinite(validators.min) ? Validators.min(validators.min) : null;
      case 'max':
        return Number.isFinite(validators.max) ? Validators.max(validators.max) : null;
      case 'minLength':
        return Number.isFinite(validators.minLength) ? Validators.minLength(validators.minLength) : null;
      case 'maxLength':
        return Number.isFinite(validators.minLength) ? Validators.maxLength(validators.maxLength) : null;
      default:
        return null;
    }
  }
}
