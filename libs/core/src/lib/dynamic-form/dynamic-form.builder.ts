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
import { DynamicFormConfigService } from './dynamic-form-config.service';
import { DynamicFormDefinition } from './dynamic-form-definition';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private configService: DynamicFormConfigService,
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  createForm(definition: DynamicFormDefinition, model: any) {
    const field = new DynamicForm(definition, model);
    field.setExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormElements(field, field, field.definition.elements));
    return field;
  }

  createFormElement(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition) {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(definition);
    element.setElements(this.createFormElements(root, parent, element.definition.elements));
    return element;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormGroup(root, parent, definition);
    field.setExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormElements(root, field, definition.elements));
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormArray(root, parent, definition);
    return field;
  }

  createFormControl(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormControl(root, parent, definition);
    field.setExpressions(this.createFieldExpressions(field));
    field.setEvaluators(this.createControlEvaluators(field.definition));
    field.setValidators(this.createControlValidators(field.definition));
    return field;
  }

  private requireElementType(type: string) {
    if (!this.configService.getElementTypeConfig(type)) {
        throw Error(`Element type ${ type } is not defined`);
    }
  }

  private requireFieldType(type: string) {
    if (!this.configService.getFieldTypeConfig(type)) {
      throw Error(`Field type ${ type } is not defined`);
    }
  }

  private createFormElements(root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormElementDefinition[]) {
    return (definitions || []).map(definition => {
      switch (definition.type) {
        case 'group':
          return this.createFormGroup(root, parent, definition as DynamicFormGroupDefinition);
        case 'array':
          return this.createFormArray(root, parent, definition as DynamicFormArrayDefinition);
        case 'control':
          return this.createFormControl(root, parent, definition as DynamicFormControlDefinition);
        default:
          return this.createFormElement(root, parent, definition);
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
