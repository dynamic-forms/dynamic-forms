import { Injectable } from '@angular/core';
import { FormArrayField } from '../form-array/form-array-field';
import { FormArrayTemplate } from '../form-array/form-array-template';
import { FormControlField } from '../form-control/form-control-field';
import { FormControlTemplate } from '../form-control/form-control-template';
import { FormControlValidator, FormControlValidators } from '../form-control/form-control-validators';
import { FormField } from '../form-field/form-field';
import { FormFieldExpressions } from '../form-field/form-field-expressions';
import { FormFieldExpressionsBuilder } from '../form-field/form-field-expressions.builder';
import { FormFieldTemplate } from '../form-field/form-field-template';
import { FormGroupField } from '../form-group/form-group-field';
import { FormGroupTemplate } from '../form-group/form-group-template';
import { FormValidationBuilder } from '../form-validation/form-validation.builder';
import { FormTemplate } from './form-template';

@Injectable()
export class FormBuilder {
  constructor(
    private expressionsBuilder: FormFieldExpressionsBuilder,
    private validationBuilder: FormValidationBuilder
  ) {}

  createForm(template: FormTemplate, model: any) {
    const field = new FormGroupField(null, null, template, model);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFormFields(field, field, field.template.fields));
    return field;
  }

  createFormGroup(root: FormField, parent: FormField, template: FormGroupTemplate) {
    const field = new FormGroupField(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFormFields(root, field, template.fields));
    return field;
  }

  createFormArray(root: FormField, parent: FormField, template: FormArrayTemplate) {
    const field = new FormArrayField(root, parent, template);
    field.setFields([]);
    return field;
  }

  createFormControl(root: FormField, parent: FormField, template: FormControlTemplate) {
    const field = new FormControlField(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setValidators(this.createValidators(field.template));
    return field;
  }

  private createFormFields(root: FormField, parent: FormField, templates: FormFieldTemplate[]) {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroup(root, parent, <FormGroupTemplate>template);
        case 'array':
          return this.createFormArray(root, parent, <FormArrayTemplate>template);
        case 'control':
          return this.createFormControl(root, parent, <FormControlTemplate>template);
        default:
          throw Error(`Type ${ template.type } is not defined`);
      }
    });
  }

  private createExpressions(field: FormField): FormFieldExpressions  {
    return this.expressionsBuilder.createExpressions(field);
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
