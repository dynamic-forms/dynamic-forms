import { Injectable } from '@angular/core';
import { FormField, FormFieldBuilder } from '../form-field';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';
import { FormControlField, FormControlTemplate } from './models';
import { FormControlValidators, FormControlValidator } from './models';

@Injectable()
export class FormControlBuilder extends FormFieldBuilder<FormControlTemplate, FormControlField> {
  constructor(private validationBuilder: FormValidationBuilder) {
    super();
  }

  createField(root: FormField, parent: FormField, template: FormControlTemplate) {
    const field = new FormControlField(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setValidators(this.createValidators(field.template));
    return field;
  }

  private createValidators(template: FormControlTemplate): FormControlValidators {
    return template.validation ? Object.keys(template.validation).map(key => {
      return this.createValidator(template, key);
    }).filter(validator => !!validator) : [];
  }

  private createValidator(template: FormControlTemplate, key: string): FormControlValidator {
    if (typeof template.validation[key] !== 'boolean' || template.validation[key]) {
      const enabled = template.validation[key];
      const value = template.input[key];
      const factory = this.validationBuilder.getValidatorFactory(key);
      const validator = enabled ? factory(value) : null;
      return { key, enabled, value, factory, validator };
    }
    return null;
  }
}
