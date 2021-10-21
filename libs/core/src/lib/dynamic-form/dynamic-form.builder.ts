import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionExpressions } from '../dynamic-form-action/dynamic-form-action-expressions';
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
import { DynamicFormElementChildren, DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementExpressions } from '../dynamic-form-element/dynamic-form-element-expressions';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldExpressions } from '../dynamic-form-field/dynamic-form-field-expressions';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormGroupValidator } from '../dynamic-form-group/dynamic-form-group-validator';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { cloneObject, mergeObject } from './dynamic-form-helpers';
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
    const field = new DynamicForm(this, definition, model);
    field.init();
    return field;
  }

  createFormElement(root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormElementDefinition): DynamicFormElement {
    this.requireElementType(definition.type);
    const element = new DynamicFormElement(this, root, parent, definition);
    element.init();
    return element;
  }

  createFormControl(root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormControlDefinition): DynamicFormControl {
    this.requireFieldType(definition.type);
    const field = new DynamicFormControl(this, root, parent, definition);
    field.init();
    return field;
  }

  createFormGroup(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormGroupDefinition): DynamicFormGroup {
    this.requireFieldType(definition.type);
    const field = new DynamicFormGroup(this, root, parent, definition);
    field.init();
    return field;
  }

  createFormArray(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormArrayDefinition): DynamicFormArray {
    this.requireFieldType(definition.type);
    const field = new DynamicFormArray(this, root, parent, definition);
    field.init();
    return field;
  }

  createFormArrayField(field: DynamicFormArray, index: number): DynamicFormField {
    const definitionTemplate = field.definition.definitionTemplate;
    const definitionBase = this.getDefinitionClone(definitionTemplate, field.root);
    const definition = { ...definitionBase, key: `${index}`, index  };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormDictionary(root: DynamicForm, parent: DynamicFormField, definition: DynamicFormDictionaryDefinition): DynamicFormDictionary {
    this.requireFieldType(definition.type);
    const field = new DynamicFormDictionary(this, root, parent, definition);
    field.init();
    return field;
  }

  createFormDictionaryField(field: DynamicFormDictionary, key: string): DynamicFormField {
    const definitionTemplate = field.definition.definitionTemplate;
    const definitionBase = this.getDefinitionClone(definitionTemplate, field.root);
    const definition = { ...definitionBase, key };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormAction(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);
    const action = new DynamicFormAction(this, root, parent, definition);
    action.init();
    return action;
  }

  createFormElementForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormElementDefinition
  ): DynamicFormElement {
    this.requireElementType(definition.type);

    const elementType = this.configService.getElementType(definition.type);
    if (elementType.factory) {
      return elementType.factory(this, root, parent, definition);
    }

    return this.createFormElement(root, parent, definition);
  }

  createFormFieldForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormFieldDefinition
  ): DynamicFormField {
    this.requireFieldType(definition.type);

    const fieldType = this.configService.getFieldType(definition.type);
    if (fieldType.factory) {
      return fieldType.factory(this, root, parent, definition);
    }

    throw Error(`Creating field of type ${ definition.type } is not supported`);
  }

  createFormActionForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormActionDefinition
  ): DynamicFormAction {
    this.requireActionType(definition.type);

    const actionType = this.configService.getActionType(definition.type);
    if (actionType.factory) {
      return actionType.factory(this, root, parent, definition);
    }

    return this.createFormAction(root, parent, definition);
  }

  createFormElements(
    root: DynamicForm, parent: DynamicFormElement, definitions: DynamicFormElementChildren
  ): DynamicFormElement[] {
    return this.getDefinitions(definitions).map((definition) => {
      const elementDefintion = this.getDefinition(definition, root);
      const classType = this.configService.getClassType(elementDefintion.type);
      switch (classType) {
        case 'element':
          return this.createFormElementForFactory(root, parent, elementDefintion);
        case 'field':
          return this.createFormFieldForFactory(root, parent, elementDefintion as DynamicFormFieldDefinition);
        case 'action':
          return this.createFormActionForFactory(root, parent, elementDefintion as DynamicFormActionDefinition);
        default:
          throw Error(`Class type ${ classType } is not defined`);
      }
    });
  }



  createFormActions(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definitions: DynamicFormActionDefinition[]
  ): DynamicFormAction[] {
    return (definitions || []).map(definition => {
      const actionDefinition = this.getDefinition(definition, root);
      return this.createFormActionForFactory(root, parent, actionDefinition);
    });
  }

  getDefinition<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    return definition.reference ? this.mergeDefinition(definition, root) : definition;
  }

  getDefinitionClone<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    return definition.reference ? this.mergeDefinition(definition, root) : cloneObject(definition);
  }

  createId(): string {
    return this.idBuilder ? this.idBuilder() : `${Date.now()}${Math.random().toString().slice(2)}`;
  }

  getFieldId(field: DynamicFormField): string {
    return field.settings.autoGeneratedId && !field.id ? this.createId() : field.id;
  }

  getActionId(action: DynamicFormAction): string {
    return !action.id
      ? `${action.template.action}-${this.createId()}`
      : action.id;
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

  createFormArrayElements(array: DynamicFormArray): DynamicFormField[] {
    const model = array.model as any[];
    return model.map((_item, index) => this.createFormArrayField(array , index));
  }

  createFormDictionaryElements(dictionary: DynamicFormDictionary): DynamicFormField[] {
    return Object.keys(dictionary.model).map((key, _index) => this.createFormDictionaryField(dictionary, key));
  }

  createControlEvaluators(control: DynamicFormControl): DynamicFormControlEvaluator[] {
    return this.evaluationBuilder.createControlEvaluators(control);
  }

  createControlValidators(control: DynamicFormControl): DynamicFormControlValidator[] {
    return this.validationBuilder.createControlValidators(control);
  }

  createGroupValidators(group: DynamicFormGroup): DynamicFormGroupValidator[] {
    return this.validationBuilder.createGroupValidators(group);
  }

  createArrayValidators(array: DynamicFormArray): DynamicFormArrayValidator[] {
    return this.validationBuilder.createArrayValidators(array);
  }

  createDictionaryValidators(dictionary: DynamicFormDictionary): DynamicFormDictionaryValidator[] {
    return this.validationBuilder.createDictionaryValidators(dictionary);
  }

  private getDefinitions(children: DynamicFormElementChildren): DynamicFormElementDefinition[] {
    if (children instanceof Array) {
      return children;
    }
    return Object.keys(children || {}).map(key => {
      return { ...children[key], key };
    });
  }

  private mergeDefinition<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    if (!root.definition.references || !root.definition.references[definition.reference]) {
      throw Error(`Definition reference ${ definition.reference } is not defined`);
    }
    const reference = cloneObject(root.definition.references[definition.reference]);
    return mergeObject(reference, definition);
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
}
