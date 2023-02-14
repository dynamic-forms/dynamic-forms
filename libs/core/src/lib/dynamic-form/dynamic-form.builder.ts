import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormActionExpressions } from '../dynamic-form-action/dynamic-form-action-expressions';
import { DynamicFormActionType } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormArray } from '../dynamic-form-array/dynamic-form-array';
import { DynamicFormArrayDefinition } from '../dynamic-form-array/dynamic-form-array-definition';
import { DynamicFormArrayAsyncValidator, DynamicFormArrayValidator } from '../dynamic-form-array/dynamic-form-array-validator';
import { DynamicFormConfigService } from '../dynamic-form-config/dynamic-form-config.service';
import { DynamicFormControl } from '../dynamic-form-control/dynamic-form-control';
import { DynamicFormControlDefinition } from '../dynamic-form-control/dynamic-form-control-definition';
import { DynamicFormControlEvaluator } from '../dynamic-form-control/dynamic-form-control-evaluator';
import { DynamicFormControlAsyncValidator, DynamicFormControlValidator } from '../dynamic-form-control/dynamic-form-control-validator';
import { DynamicFormDictionary } from '../dynamic-form-dictionary/dynamic-form-dictionary';
import { DynamicFormDictionaryDefinition } from '../dynamic-form-dictionary/dynamic-form-dictionary-definition';
import {
  DynamicFormDictionaryAsyncValidator,DynamicFormDictionaryValidator,
} from '../dynamic-form-dictionary/dynamic-form-dictionary-validator';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormElementExpressions } from '../dynamic-form-element/dynamic-form-element-expressions';
import { DynamicFormElementType } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormError } from '../dynamic-form-error/dynamic-form-error';
import { DynamicFormErrorType } from '../dynamic-form-error/dynamic-form-error-type';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormEvaluationBuilder } from '../dynamic-form-evaluation/dynamic-form-evaluation.builder';
import { DynamicFormExpressionBuilder } from '../dynamic-form-expression/dynamic-form-expression.builder';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldExpressions } from '../dynamic-form-field/dynamic-form-field-expressions';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormGroup } from '../dynamic-form-group/dynamic-form-group';
import { DynamicFormGroupDefinition } from '../dynamic-form-group/dynamic-form-group-definition';
import { DynamicFormGroupAsyncValidator, DynamicFormGroupValidator } from '../dynamic-form-group/dynamic-form-group-validator';
import { DynamicFormValidationBuilder } from '../dynamic-form-validation/dynamic-form-validation.builder';
import { DynamicForm } from './dynamic-form';
import { DynamicFormDefinition } from './dynamic-form-definition';
import { cloneObject, mergeObject } from './dynamic-form-helpers';
import { DynamicFormIdBuilder, DYNAMIC_FORM_ID_BUILDER } from './dynamic-form-id.builder';

export interface DynamicFormFieldConstructor<Field extends DynamicFormField> {
  // eslint-disable-next-line @typescript-eslint/prefer-function-type
  new(
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: DynamicFormFieldDefinition,
    type: DynamicFormFieldType
  ): Field;
}

@Injectable()
export class DynamicFormBuilder {
  constructor(
    private configService: DynamicFormConfigService,
    private expressionBuilder: DynamicFormExpressionBuilder,
    private evaluationBuilder: DynamicFormEvaluationBuilder,
    private validationBuilder: DynamicFormValidationBuilder,
    private errorHandler: DynamicFormErrorHandler,
    @Optional() @Inject(DYNAMIC_FORM_ID_BUILDER)
    private idBuilder: DynamicFormIdBuilder,
  ) {}

  initForm<Value extends { [key: string]: any } = any, Model extends Value = Value>(
    definition: DynamicFormDefinition, model: Model,
  ): DynamicForm<Value, Model> {
    const field = this.createForm<Value, Model>(definition, model);
    field.check();
    return field;
  }

  createForm<Value extends { [key: string]: any } = any, Model extends Value = Value>(
    definition: DynamicFormDefinition, model: Model,
  ): DynamicForm<Value, Model> {
    const field = new DynamicForm<Value, Model>(this, definition, model);
    field.init();
    return field;
  }

  createFormElement(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormElementDefinition,
  ): DynamicFormElement | undefined {
    const elementType = this.getElementType(definition);
    return elementType
      ? this.createFormElementForType(root, parent, definition, elementType)
      : undefined;
  }

  createFormControl(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormControlDefinition,
  ): DynamicFormControl | undefined {
    const fieldType = this.getFieldType(definition);
    return fieldType
      ? this.createFormFieldForType(DynamicFormControl, root, parent, definition, fieldType)
      : undefined;
  }

  createFormGroup(
    root: DynamicForm, parent: DynamicFormField, definition: DynamicFormGroupDefinition,
  ): DynamicFormGroup | undefined {
    const fieldType = this.getFieldType(definition);
    return fieldType
      ? this.createFormFieldForType(DynamicFormGroup, root, parent, definition, fieldType)
      : undefined;
  }

  createFormArray(
    root: DynamicForm, parent: DynamicFormField, definition: DynamicFormArrayDefinition,
  ): DynamicFormArray | undefined {
    const fieldType = this.getFieldType(definition);
    return fieldType
      ? this.createFormFieldForType(DynamicFormArray, root, parent, definition, fieldType)
      : undefined;
  }

  createFormArrayField(field: DynamicFormArray, index: number): DynamicFormField | undefined {
    const definitionTemplate = field.definition.definitionTemplate || {};
    const definitionBase = this.getDefinitionClone(definitionTemplate, field.root);
    const definition = { ...definitionBase, key: `${index}`, index  };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormDictionary(
    root: DynamicForm, parent: DynamicFormField, definition: DynamicFormDictionaryDefinition,
  ): DynamicFormDictionary | undefined {
    const fieldType = this.getFieldType(definition);
    return fieldType
      ? this.createFormFieldForType(DynamicFormDictionary, root, parent, definition, fieldType)
      : undefined;
  }

  createFormDictionaryField(field: DynamicFormDictionary, key: string): DynamicFormField | undefined {
    const definitionTemplate = field.definition.definitionTemplate || {};
    const definitionBase = this.getDefinitionClone(definitionTemplate, field.root);
    const definition = { ...definitionBase, key };
    return this.createFormFieldForFactory(field.root, field, definition);
  }

  createFormAction(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definition: DynamicFormActionDefinition,
  ): DynamicFormAction | undefined {
    const actionType = this.getActionType(definition);
    return actionType
      ? this.createFormActionForType(root, parent, definition, actionType)
      : undefined;
  }

  createFormElementForType(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormElementDefinition, type: DynamicFormElementType,
  ): DynamicFormElement {
    const element = new DynamicFormElement(this, root, parent, definition, type);
    element.init();
    return element;
  }

  createFormFieldForType<Field extends DynamicFormField>(
    fieldConstructor: DynamicFormFieldConstructor<Field>,
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormFieldDefinition, type: DynamicFormFieldType,
  ): Field {
    const field = new fieldConstructor(this, root, parent, definition, type);
    field.init();
    return field;
  }

  createFormActionForType(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormActionDefinition, type: DynamicFormActionType,
  ): DynamicFormAction {
    const action = new DynamicFormAction(this, root, parent, definition, type);
    action.init();
    return action;
  }

  createFormElementForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormElementDefinition,
  ): DynamicFormElement | undefined {
    const elementType = this.getElementType(definition);
    if (!elementType) {
      return undefined;
    }

    return !elementType.factory
      ? this.createFormElementForType(root, parent, definition, elementType)
      : elementType.factory(this, root, parent, definition, elementType);
  }

  createFormFieldForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormFieldDefinition,
  ): DynamicFormField | undefined {
    const fieldType = this.getFieldType(definition);
    if (!fieldType) {
      return undefined;
    }

    if (fieldType.factory) {
      return fieldType.factory(this, root, parent, definition, fieldType);
    }

    this.handleError(DynamicFormErrorType.FieldType, `Field type ${ fieldType.type } does not provide a factory`);
    return undefined;
  }

  createFormActionForFactory(
    root: DynamicForm, parent: DynamicFormElement, definition: DynamicFormActionDefinition,
  ): DynamicFormAction | undefined {
    const actionType = this.getActionType(definition);
    if (!actionType) {
      return undefined;
    }

    return !actionType.factory
      ? this.createFormActionForType(root, parent, definition, actionType)
      : actionType.factory(this, root, parent, definition, actionType);
  }

  createFormElements(
    root: DynamicForm, parent: DynamicFormElement, definitions: DynamicFormElementDefinition[],
  ): DynamicFormElement[] {
    return (definitions || [])
      .map((definition) => {
        const elementDefintion = this.getDefinition(definition, root);
        const classType = this.configService.getClassType(elementDefintion.type);
        switch (classType) {
          case 'element':
            return this.createFormElementForFactory(root, parent, elementDefintion);
          case 'field':
            return this.createFormFieldForFactory(root, parent, elementDefintion as DynamicFormFieldDefinition);
          case 'action':
            return this.createFormActionForFactory(root, parent,  elementDefintion as DynamicFormActionDefinition);
          default:
            this.handleError(DynamicFormErrorType.ClassType, `Class type ${ classType } is not defined`);
            return undefined;
        }
      })
      .filter(element => !!element);
  }

  createFormActions(
    root: DynamicForm, parent: DynamicFormElement | DynamicFormField, definitions: DynamicFormActionDefinition[],
  ): DynamicFormAction[] {
    return (definitions || [])
      .map(definition => {
        const actionDefinition = this.getDefinition(definition, root);
        return this.createFormActionForFactory(root, parent, actionDefinition);
      })
      .filter(element => !!element);
  }

  getDefinition<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    return definition.reference ? this.mergeDefinition(definition, root) : definition;
  }

  getDefinitionClone<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    return definition.reference ? this.mergeDefinition(definition, root) : cloneObject(definition);
  }

  createId(): string {
    return this.idBuilder?.createId ? this.idBuilder?.createId() : `${Date.now()}${Math.random().toString().slice(2)}`;
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

  createFormArrayElements(array: DynamicFormArray): DynamicFormField[] | undefined {
    const type = this.getFieldType(this.getDefinition(array.definition.definitionTemplate || {}, array.root));
    if (!type) {
      return undefined;
    }
    return array.model.map((_item, index) => this.createFormArrayField(array , index));
  }

  createFormDictionaryElements(dictionary: DynamicFormDictionary): DynamicFormField[] {
    const type = this.getFieldType(this.getDefinition(dictionary.definition.definitionTemplate || {}, dictionary.root));
    if (!type) {
      return undefined;
    }
    return Object.keys(dictionary.model).map((key, _index) => this.createFormDictionaryField(dictionary, key));
  }

  createControlEvaluators(control: DynamicFormControl): DynamicFormControlEvaluator[] {
    return this.evaluationBuilder.createControlEvaluators(control);
  }

  createControlValidators(control: DynamicFormControl): (DynamicFormControlValidator | DynamicFormControlAsyncValidator)[] {
    return this.validationBuilder.createControlValidators(control);
  }

  createGroupValidators(group: DynamicFormGroup): (DynamicFormGroupValidator | DynamicFormGroupAsyncValidator)[] {
    return this.validationBuilder.createGroupValidators(group);
  }

  createArrayValidators(array: DynamicFormArray): (DynamicFormArrayValidator | DynamicFormArrayAsyncValidator)[] {
    return this.validationBuilder.createArrayValidators(array);
  }

  createDictionaryValidators(dictionary: DynamicFormDictionary): (DynamicFormDictionaryValidator | DynamicFormDictionaryAsyncValidator)[] {
    return this.validationBuilder.createDictionaryValidators(dictionary);
  }

  private mergeDefinition<TDefinition extends DynamicFormElementDefinition>(definition: TDefinition, root: DynamicForm): TDefinition {
    if (!root.definition.references?.[definition.reference]) {
      this.handleError(DynamicFormErrorType.DefinitionReference, `Definition reference ${ definition.reference } is not defined`);
      return definition;
    }
    const reference = cloneObject(root.definition.references[definition.reference]);
    return mergeObject(reference, definition);
  }

  private getElementType(definition: DynamicFormElementDefinition): DynamicFormElementType | undefined {
    const type = definition.type ? this.configService.getElementType(definition.type) : undefined;
    return this.handleUndefined(type, DynamicFormErrorType.ElementType, () => `Element type ${ definition.type } is not defined`);
  }

  private getFieldType(definition: DynamicFormFieldDefinition): DynamicFormFieldType | undefined {
    const type = definition.type ? this.configService.getFieldType(definition.type) : undefined;
    return this.handleUndefined(type, DynamicFormErrorType.FieldType, () => `Field type ${ definition.type } is not defined`);
  }

  private getActionType(definition: DynamicFormActionDefinition): DynamicFormActionType | undefined {
    const type = definition.type ? this.configService.getActionType(definition.type) : undefined;
    return this.handleUndefined(type, DynamicFormErrorType.ActionType, () => `Action type ${ definition.type } is not defined`);
  }

  private handleError<ErrorType extends DynamicFormErrorType = DynamicFormErrorType>(type: ErrorType, message: string): void {
    this.errorHandler.handle(new DynamicFormError<ErrorType>(type, message));
  }

  private handleUndefined<Value, ErrorType extends DynamicFormErrorType = DynamicFormErrorType>(
    value: Value | undefined, type: ErrorType, createMessage: () => string,
  ): Value | undefined {
    return this.errorHandler.handleUndefined(value, () => new DynamicFormError<ErrorType>(type, createMessage()));
  }
}
