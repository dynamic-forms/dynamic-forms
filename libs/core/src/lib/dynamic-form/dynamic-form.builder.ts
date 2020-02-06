import { Injectable } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl, DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
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
    private configService: DynamicFormConfigService,
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder
  ) {}

  initForm(definition: DynamicFormDefinition, model: any) {
    const field = this.createForm(definition, model);
    field.check();
    return field;
  }

  createForm(definition: DynamicFormDefinition, model: any) {
    const field = new DynamicForm(definition, model);
    field.setExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormElements(field, field, field.definition.elements));
    field.setActions(this.createFormActions(field, field.definition.actions));
    return field;
  }

  createFormElement(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition) {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(definition);
    element.setElements(this.createFormElements(root, parent, element.definition.elements));
    return element;
  }

  createFormField(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormFieldDefinition): DynamicFormField {
    this.requireFieldType(definition.type);
    switch (definition.type) {
      case 'group':
        return this.createFormGroup(root, parent, definition as DynamicFormGroupDefinition);
      case 'array':
        return this.createFormArray(root, parent, definition as DynamicFormArrayDefinition);
      case 'control':
        return this.createFormControl(root, parent, definition as DynamicFormControlDefinition);
      default:
        throw Error(`Creating field of type ${ definition.type } is not supported`);
    }
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
    field.setExpressions(this.createFieldExpressions(field));
    field.setElements(this.createFormArrayElements(root, field, definition.definitionTemplate));
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

  createFormAction(parent: DynamicFormField, definition: DynamicFormActionDefinition) {
    this.requireActionType(definition.type);
    return new DynamicFormAction(parent, definition);
  }

  private requireElementType(type: string) {
    if (this.configService.getClassType(type) !== 'element') {
        throw Error(`Element type ${ type } is not defined`);
    }
  }

  private requireFieldType(type: string) {
    if (this.configService.getClassType(type) !== 'field') {
      throw Error(`Field type ${ type } is not defined`);
    }
  }

  private requireActionType(type: string) {
    if (this.configService.getClassType(type) !== 'action') {
      throw Error(`Action type ${ type } is not defined`);
    }
  }

  private createFormElements(root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormElementDefinition[]) {
    return (definitions || []).map(definition => {
      const classType = this.configService.getClassType(definition.type);
      switch (classType) {
        case 'element':
          return this.createFormElement(root, parent, definition);
        case 'field':
          return this.createFormField(root, parent, definition as DynamicFormFieldDefinition);
        case 'action':
          return this.createFormAction(parent, definition as DynamicFormActionDefinition);
        default:
          throw Error(`Class type ${ classType } is not defined`);
      }
    });
  }

  private createFormArrayElements(root: DynamicFormField, parent: DynamicFormArray, definitionTemplate: DynamicFormElementDefinition) {
    const modelItems = parent.model || [] as any[];
    const definitions = modelItems.map((_item, index) => {
      const definition = JSON.parse(JSON.stringify(definitionTemplate));
      return { ...definition, key: index.toString() } as DynamicFormElementDefinition;
    });
    return this.createFormElements(root, parent, definitions);
  }

  private createFormActions<Field extends DynamicFormField>(parent: Field, definitions: DynamicFormActionDefinition[]) {
    return (definitions || []).map(definition => {
      return this.createFormAction(parent, definition);
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
