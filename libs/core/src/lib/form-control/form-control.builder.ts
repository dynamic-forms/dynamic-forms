import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlTemplate, FormControlField } from './form-control.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';

@Injectable()
export class FormControlBuilder extends FormFieldBuilder {
  constructor(private validationBuilder: FormValidationBuilder) {
    super();
  }

  createFormField(parentPath: string, parentModel: any, template: FormControlTemplate) {
    const path = this.getPath(parentPath, template);
    const model = this.getModel(parentModel, template);
    const validators = this.getValidators(template);
    const control = new FormControl(model, validators);
    return new FormControlField(path, template, control, parentModel, model);
  }

  private getValidators(template: FormControlTemplate) {
    if (template.validation) {
      return Object.keys(template.validation)
        .map(key => this.getValidator(template, key))
        .filter(validator => !!validator);
    }
    return [];

  }

  private getValidator(template: FormControlTemplate, key: string) {
    const value = template.input[key];
    return this.validationBuilder.getValidator(template.validation, key, value);
  }
}
