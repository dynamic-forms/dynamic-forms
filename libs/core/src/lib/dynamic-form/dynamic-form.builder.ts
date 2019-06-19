import { Injectable } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlTemplate } from '../dynamic-form-control/dynamic-form-control-template';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private expressionBuilder: DynamicFormExpressionBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  createForm(definition: DynamicFormDefinition, model: any) {
    const field = new DynamicForm(definition, model);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setFields(this.createFormFields(field, field, field.definition.fields));
    return field;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition) {
    const field = new DynamicFormGroup(root, parent, definition);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setFields(this.createFormFields(root, field, definition.fields));
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    const field = new DynamicFormArray(root, parent, definition);
    field.setFields([]);
    return field;
  }

  createFormControl(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition) {
    const field = new DynamicFormControl(root, parent, definition);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setValidators(this.createValidators(field.template));
    return field;
  }

  private createFormFields(root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormFieldDefinition[]) {
    return (definitions || []).map(definition => {
      switch (definition.type) {
        case 'group':
          return this.createFormGroup(root, parent, <DynamicFormGroupDefinition>definition);
        case 'array':
          return this.createFormArray(root, parent, <DynamicFormArrayDefinition>definition);
        case 'control':
          return this.createFormControl(root, parent, <DynamicFormControlDefinition>definition);
        default:
          throw Error(`Type ${ definition.type } is not defined`);
      }
    });
  }

  private createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    return this.expressionBuilder.createFieldExpressions(field);
  }

  private createValidators(template: DynamicFormControlTemplate): DynamicFormControlValidator[] {
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
