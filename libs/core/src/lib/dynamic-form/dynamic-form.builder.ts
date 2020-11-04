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
import { DynamicFormDictionary } from '../dynamic-form-dictionary/dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from '../dynamic-form-dictionary/dynamic-form-dictionary-definition';
import { DynamicFormDictionaryValidator } from '../dynamic-form-dictionary/dynamic-form-dictionary-validator';
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
    field.initHeaderActions(this.createFormActions(field, field, field.definition.headerActions));
    field.initFooterActions(this.createFormActions(field, field, field.definition.footerActions));
    return field;
  }

  createFormElement(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormElementDefinition): DynamicFormElement {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(definition);
    element.initExpressions(this.createElementExpressions(element));
    element.initElements(this.createFormElements(root, parent, element.definition.elements));
    return element;
  }

  createFormControl(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormControlDefinition): DynamicFormControl {
    this.requireFieldType(definition.type);
    const field = new DynamicFormControl(root, parent, definition);
    field.initId(this.getFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initEvaluators(this.createControlEvaluators(field));
    field.initValidators(this.createControlValidators(field));
    return field;
  }

  createFormGroup(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormGroupDefinition): DynamicFormGroup {
    this.requireFieldType(definition.type);
    const field = new DynamicFormGroup(root, parent, definition);
    field.initId(this.getFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormElements(root, field, field.definition.elements));
    field.initValidators(this.createGroupValidators(field));
    field.initHeaderActions(this.createFormActions(root, field, field.definition.headerActions));
    field.initFooterActions(this.createFormActions(root, field, field.definition.footerActions));
    return field;
  }

  createFormArray(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormArrayDefinition): DynamicFormArray {
    this.requireFieldType(definition.type);
    const field = new DynamicFormArray(root, parent, definition);
    field.initId(this.getFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormArrayElements(field));
    field.initValidators(this.createArrayValidators(field));
    field.initHeaderActions(this.createFormActions(root, field, field.definition.headerActions));
    field.initFooterActions(this.createFormActions(root, field, field.definition.footerActions));
    return field;
  }

  createFormArrayField(field: DynamicFormArray, index: number): DynamicFormField {
    const definition = { ...cloneObject(field.definition.definitionTemplate), key: `${index}`, index };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormDictionary(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormDictionaryDefinition): DynamicFormDictionary {
    this.requireFieldType(definition.type);
    const field = new DynamicFormDictionary(root, parent, definition);
    field.initId(this.getFieldId(field));
    field.initExpressions(this.createFieldExpressions(field));
    field.initElements(this.createFormDictionaryElements(field));
    field.initValidators(this.createDictionaryValidators(field));
    field.initHeaderActions(this.createFormActions(root, field, field.definition.headerActions));
    field.initFooterActions(this.createFormActions(root, field, field.definition.footerActions));
    return field;
  }

  createFormDictionaryField(field: DynamicFormDictionary, key: string): DynamicFormField {
    const definition = { ...cloneObject(field.definition.definitionTemplate), key };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormAction(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);
    const action = new DynamicFormAction(root, parent, definition);
    action.initExpressions(this.createActionExpressions(action));
    if (action.dialogDefinition) {
      const dialog = this.createForm(action.dialogDefinition, {});
      dialog.initExpressions(this.createFieldExpressions(dialog));
      dialog.initElements(this.createFormElements(dialog, dialog, dialog.definition.elements));
      dialog.initHeaderActions(this.createFormActions(root, action, dialog.definition.headerActions));
      dialog.initFooterActions(this.createFormActions(root, action, dialog.definition.footerActions));
      action.initDialog(dialog);
    }
    return action;
  }

  createFormElementForFactory(
    root: DynamicForm, parent: DynamicFormField, definition: DynamicFormElementDefinition
  ): DynamicFormElement {
    this.requireElementType(definition.type);

    const elementType = this.configService.getElementType(definition.type);
    if (elementType.factory) {
      return elementType.factory(this, root, parent, definition);
    }

    return this.createFormElement(root, parent, definition);
  }

  createFormFieldForFactory(
    root: DynamicForm, parent: DynamicFormField, definition: DynamicFormFieldDefinition
  ): DynamicFormField {
    this.requireFieldType(definition.type);

    const fieldType = this.configService.getFieldType(definition.type);
    if (fieldType.factory) {
      return fieldType.factory(this, root, parent, definition);
    }

    throw Error(`Creating field of type ${ definition.type } is not supported`);
  }

  createFormActionForFactory(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);

    const actionType = this.configService.getActionType(definition.type);
    if (actionType.factory) {
      return actionType.factory(this, root, parent, definition);
    }

    return this.createFormAction(root, parent, definition);
  }

  createFormElements(
    root: DynamicForm, parent: DynamicFormField, definitions: DynamicFormElementDefinition[]
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
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definitions: DynamicFormActionDefinition[]
  ): DynamicFormAction[] {
    return (definitions || []).map(definition => {
      return this.createFormActionForFactory(root, parent, definition);
    });
  }

  createId(): string {
    return this.idBuilder ? this.idBuilder() : Date.now().toString();
  }

  getFieldId(field: DynamicFormField): string {
    return field.settings.autoGeneratedId && !field.id ? this.createId() : field.id;
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

  private createFormArrayElements(array: DynamicFormArray): DynamicFormField[] {
    const model = array.model || [] as any[];
    return model.map((_item, index) => this.createFormArrayField(array , index));
  }

  private createFormDictionaryElements(dictionary: DynamicFormDictionary): DynamicFormField[] {
    const model = dictionary.model || {} as any;
    return Object.keys(model).map((key, _index) => this.createFormDictionaryField(dictionary, key));
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

  private createDictionaryValidators(dictionary: DynamicFormDictionary): DynamicFormDictionaryValidator[] {
    return this.validationBuilder.createDictionaryValidators(dictionary);
  }
}
