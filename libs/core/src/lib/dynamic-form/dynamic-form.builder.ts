import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormArrayValidator } from '../dynamic-form-array/dynamic-form-array-validator';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control-evaluator';
import { DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormActionExpressions } from '../dynamic-form-expression/dynamic-form-action-expressions';
import { DynamicFormElementExpressions } from '../dynamic-form-expression/dynamic-form-element-expressions';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormGroupValidator } from '../dynamic-form-group/dynamic-form-group-validator';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { cloneObject } from './dynamic-form-helpers';
import { DynamicFormIdBuilder, DYNAMIC_FORM_ID_BUILDER } from './dynamic-form-id.builder';

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private configService: DynamicFormConfigService,
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder,
    @Optional() @Inject(DYNAMIC_FORM_ID_BUILDER)
    private idBuilder: DynamicFormIdBuilder
  ) {}

  initForm(definition: DynamicFormDefinition, model: any): DynamicForm {
    const field = this.createForm(definition, model);
    field.check();
    return field;
  }

  createForm(definition: DynamicFormDefinition, model: any): DynamicForm {
    const field = new DynamicForm(definition, model);
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormElements(field, field, field.definition.elements));
    field.initActions(this.createFormActions(field, field, field.definition.actions));
    return field;
  }

  createFormElement(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition): DynamicFormElement {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(definition);
    element.initExpressions(this.createElementExpressions(element));
    element.initElements(this.createFormElements(root, parent, element.definition.elements));
    return element;
  }

  createFormGroup(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition): DynamicFormGroup {
    this.requireFieldType(definition.type);
    const field = new DynamicFormGroup(root, parent, definition);
    field.initId(this.createFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormElements(root, field, field.definition.elements));
    field.initValidators(this.createGroupValidators(field));
    return field;
  }

  createFormArray(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormArrayDefinition): DynamicFormArray {
    this.requireFieldType(definition.type);
    const field = new DynamicFormArray(root, parent, definition);
    field.initId(this.createFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormArrayElements(field));
    field.initActions(this.createFormActions(field, field, field.definition.actions));
    field.initValidators(this.createArrayValidators(field));
    return field;
  }

  createFormArrayElement(field: DynamicFormArray, index: number): DynamicFormField {
    const definition = { ...cloneObject(field.definition.definitionTemplate), key: `${index}`, index };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormControl(
    root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormControlDefinition
  ): DynamicFormControl {
    this.requireFieldType(definition.type);
    const field = new DynamicFormControl(root, parent, definition);
    field.initId(this.createFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initEvaluators(this.createControlEvaluators(field));
    field.initValidators(this.createControlValidators(field));
    return field;
  }

  createFormAction(
    root: DynamicFormField, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);
    const action = new DynamicFormAction(root, parent, definition);
    action.initExpressions(this.createActionExpressions(action));
    return action;
  }

  createFormElementForFactory(
    root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormElementDefinition
  ): DynamicFormElement {
    this.requireElementType(definition.type);

    const elementType = this.configService.getElementType(definition.type);
    if (elementType.factory) {
      return elementType.factory(this, root, parent, definition);
    }

    return this.createFormElement(root, parent, definition);
  }

  createFormFieldForFactory(
    root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormFieldDefinition
  ): DynamicFormField {
    this.requireFieldType(definition.type);

    const fieldType = this.configService.getFieldType(definition.type);
    if (fieldType.factory) {
      return fieldType.factory(this, root, parent, definition);
    }

    throw Error(`Creating field of type ${ definition.type } is not supported`);
  }

  createFormActionForFactory(
    root: DynamicFormField, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);

    const actionType = this.configService.getActionType(definition.type);
    if (actionType.factory) {
      return actionType.factory(this, root, parent, definition);
    }

    return this.createFormAction(root, parent, definition);
  }

  createFormElements(
    root: DynamicFormField, parent: DynamicFormField, definitions: DynamicFormElementDefinition[]
  ): DynamicFormElement[] {
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

  createFormActions(
    root: DynamicFormField, parent: DynamicFormElement | DynamicFormField, definitions: DynamicFormActionDefinition[]
  ): DynamicFormAction[] {
    return (definitions || []).map(definition => {
      return this.createFormActionForFactory(root, parent, definition);
    });
  }

  createFieldId(field: DynamicFormField): string {
    return field.options.autoGeneratedId && !field.id && this.idBuilder
      ? this.idBuilder()
      : field.id;
  }


  createElementExpressions(element: DynamicFormElement): DynamicFormElementExpressions {
    return this.expressionBuilder.createElementExpressions(element);
  }

  createFieldExpressions(field: DynamicFormField): DynamicFormFieldExpressions {
    return this.expressionBuilder.createFieldExpressions(field);
  }

  createActionExpressions(action: DynamicFormAction): DynamicFormActionExpressions {
    return this.expressionBuilder.createActionExpressions(action);
  }

  private requireElementType(type: string): void {
    if (this.configService.getClassType(type) !== 'element') {
        throw Error(`Element type ${ type } is not defined`);
    }
  }

  private requireFieldType(type: string): void {
    if (this.configService.getClassType(type) !== 'field') {
      throw Error(`Field type ${ type } is not defined`);
    }
  }

  private requireActionType(type: string): void {
    if (this.configService.getClassType(type) !== 'action') {
      throw Error(`Action type ${ type } is not defined`);
    }
  }

  private createFormArrayElements(field: DynamicFormArray): DynamicFormField[] {
    const modelItems = field.model || [] as any[];
    return modelItems.map((_item, index) => this.createFormArrayElement(field , index));
  }

  private createControlEvaluators(control: DynamicFormControl): DynamicFormControlEvaluator[] {
    return this.evaluationBuilder.createControlEvaluators(control);
  }

  private createControlValidators(control: DynamicFormControl): DynamicFormControlValidator[] {
    return this.validationBuilder.createControlValidators(control);
  }

  private createGroupValidators(group: DynamicFormGroup): DynamicFormGroupValidator[] {
    return this.validationBuilder.createGroupValidators(group);
  }

  private createArrayValidators(array: DynamicFormArray): DynamicFormArrayValidator[] {
    return this.validationBuilder.createArrayValidators(array);
  }
}
