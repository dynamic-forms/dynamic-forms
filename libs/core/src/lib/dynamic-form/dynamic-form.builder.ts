import { Injectable } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayTemplate } from '../dynamic-form-array/dynamic-form-array-template';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidator, DynamicFormControlValidators } from '../dynamic-form-control/dynamic-form-control-validators';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressions } from '../dynamic-form-field/dynamic-form-field-expressions';
import { DynamicFormFieldExpressionsBuilder } from '../dynamic-form-field/dynamic-form-field-expressions.builder';
import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupTemplate } from '../dynamic-form-group/dynamic-form-group-template';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicFormTemplate } from './dynamic-form-template';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private expressionsBuilder: DynamicFormFieldExpressionsBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  createForm(template: DynamicFormTemplate, model: any) {
    const field = new DynamicFormGroup(null, null, template, model);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFormFields(field, field, field.template.fields));
    return field;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, template: DynamicFormGroupTemplate) {
    const field = new DynamicFormGroup(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setFields(this.createFormFields(root, field, template.fields));
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, template: DynamicFormArrayTemplate) {
    const field = new DynamicFormArray(root, parent, template);
    field.setFields([]);
    return field;
  }

  createFormControl(root: DynamicFormField, parent: DynamicFormField, template: DynamicFormControlTemplate) {
    const field = new DynamicFormControl(root, parent, template);
    field.setExpressions(this.createExpressions(field));
    field.setValidators(this.createValidators(field.template));
    return field;
  }

  private createFormFields(root: DynamicFormField, parent: DynamicFormField, templates: DynamicFormFieldTemplate[]) {
    return (templates || []).map(template => {
      switch (template.type) {
        case 'group':
          return this.createFormGroup(root, parent, <DynamicFormGroupTemplate>template);
        case 'array':
          return this.createFormArray(root, parent, <DynamicFormArrayTemplate>template);
        case 'control':
          return this.createFormControl(root, parent, <DynamicFormControlTemplate>template);
        default:
          throw Error(`Type ${ template.type } is not defined`);
      }
    });
  }

  private createExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    return this.expressionsBuilder.createExpressions(field);
  }

  private createValidators(template: DynamicFormControlTemplate): DynamicFormControlValidators {
    return template.validation ? Object.keys(template.validation).map(key => {
      return this.createValidator(template, key);
    }).filter(validator => !!validator) : [];
  }

  private createValidator(template: DynamicFormControlTemplate, key: string): DynamicFormControlValidator {
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
