import { Injectable } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { cloneObject } from './dynamic-form-helpers';

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
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormElements(field, field, field.definition.elements));
    field.initActions(this.createFormActions(field, field, field.definition.actions));
    return field;
  }

  createFormElement(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition) {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(definition);
    element.initElements(this.createFormElements(root, parent, element.definition.elements));
    return element;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormGroup(root, parent, definition);
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormElements(root, field, field.definition.elements));
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormArray(root, parent, definition);
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormArrayElements(root, field, field.definition.definitionTemplate));
    return field;
  }

  createFormControl(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition) {
    this.requireFieldType(definition.type);
    const field = new DynamicFormControl(root, parent, definition);
    field.initExpressions(this.createFieldExpressions(field));
    field.initEvaluators(this.createControlEvaluators(field.definition));
    field.initValidators(this.createControlValidators(field.definition));
    return field;
  }

  createFormAction(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormActionDefinition) {
    this.requireActionType(definition.type);
    const action = new DynamicFormAction(root, parent, definition);
    action.initExpressions(this.createActionExpressions(action));
    return action;
  }

  createFormElementForFactory(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition) {
    this.requireElementType(definition.type);

    const elementType = this.configService.getElementType(definition.type);
    if (elementType.factory) {
      return elementType.factory(this, root, parent, definition);
    }

    return this.createFormElement(root, parent, definition);
  }

  createFormFieldForFactory(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormFieldDefinition) {
    this.requireFieldType(definition.type);

    const fieldType = this.configService.getFieldType(definition.type);
    if (fieldType.factory) {
      return fieldType.factory(this, root, parent, definition);
    }

    throw Error(`Creating field of type ${ definition.type } is not supported`);
  }

  createFormActionForFactory(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormActionDefinition) {
    this.requireActionType(definition.type);

    const actionType = this.configService.getActionType(definition.type);
    if (actionType.factory) {
      return actionType.factory(this, root, parent, definition);
    }

    return this.createFormAction(root, parent, definition);
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
          return this.createFormElementForFactory(root, parent, definition);
        case 'field':
          return this.createFormFieldForFactory(root, parent, definition as DynamicFormFieldDefinition);
        case 'action':
          return this.createFormActionForFactory(root, parent, definition as DynamicFormActionDefinition);
        default:
          throw Error(`Class type ${ classType } is not defined`);
      }
    });
  }

  private createFormArrayElements(root: DynamicFormField, parent: DynamicFormArray, definitionTemplate: DynamicFormFieldDefinition) {
    const modelItems = parent.model || [] as any[];
    return modelItems.map((_item, index) => {
      const definition = { ...cloneObject(definitionTemplate), key: `${index}`, index };
      return this.createFormFieldForFactory(root, parent, definition as DynamicFormFieldDefinition);
    });
  }

  private createFormActions(root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormActionDefinition[]) {
    return (definitions || []).map(definition => {
      return this.createFormActionForFactory(root, parent, definition);
    });
  }

  private createFieldExpressions(field: DynamicFormField) {
    return this.expressionBuilder.createFieldExpressions(field);
  }

  private createActionExpressions(action: DynamicFormAction) {
    return this.expressionBuilder.createActionExpressions(action);
  }

  private createControlEvaluators(definition: DynamicFormControlDefinition) {
    return this.evaluationBuilder.createControlEvaluators(definition);
  }

  private createControlValidators(definition: DynamicFormControlDefinition) {
    return this.validationBuilder.createControlValidators(definition.template);
  }
}
