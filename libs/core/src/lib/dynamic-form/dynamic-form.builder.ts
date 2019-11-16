import { Injectable } from '@angular/core';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormControl, DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  createForm(definition: DynamicFormDefinition, model: any) {
    const field = new DynamicForm(definition, model);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.elements = this.createFormElements(field, field, field.definition.elements);
    return field;
  }

  createFormElement(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition) {
    const element = new DynamicFormElement(definition);
    element.elements = this.createFormElements(root, parent, element.definition.elements);
    return element;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition) {
    const field = new DynamicFormGroup(root, parent, definition);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.elements = this.createFormElements(root, field, definition.elements);
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    const field = new DynamicFormArray(root, parent, definition);
    return field;
  }

  createFormControl(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition) {
    const field = new DynamicFormControl(root, parent, definition);
    field.setFieldExpressions(this.createFieldExpressions(field));
    field.setEvaluators(this.createControlEvaluators(field.definition));
    field.setValidators(this.createControlValidators(field.definition));
    return field;
  }

  private createFormElements(root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormElementDefinition[]) {
    return (definitions || []).map(definition => {
      switch (definition.type) {
        case 'element':
          return this.createFormElement(root, parent, definition);
        case 'group':
          return this.createFormGroup(root, parent, definition as DynamicFormGroupDefinition);
        case 'array':
          return this.createFormArray(root, parent, definition as DynamicFormArrayDefinition);
        case 'control':
          return this.createFormControl(root, parent, definition as DynamicFormControlDefinition);
        default:
          throw Error(`Type ${ definition.type } is not defined`);
      }
    });
  }

  private createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    return this.expressionBuilder.createFieldExpressions(field);
  }

  private createControlEvaluators(definition: DynamicFormControlDefinition): DynamicFormControlEvaluator[] {
    return this.evaluationBuilder.createControlEvaluators(definition);
  }

  private createControlValidators(definition: DynamicFormControlDefinition): DynamicFormControlValidator[] {
    return this.validationBuilder.createControlValidators(definition.template);
  }
}
