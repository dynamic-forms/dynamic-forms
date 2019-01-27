import { Injectable } from '@angular/core';
import { FormControlTemplate, FormControlField, FormControlValidators, FormControlValidator } from './form-control.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';

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
    const enabled = template.validation[key];
    const value = template.input[key];
    const factory = this.validationBuilder.getValidatorFactory(key);
    return { key, factory, enabled, value };
  }
}
