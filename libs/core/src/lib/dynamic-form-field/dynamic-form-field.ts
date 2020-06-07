import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormFieldExpressionData } from '../dynamic-form-expression/dynamic-form-field-expression-data';
import { DynamicFormFieldExpressions } from '../dynamic-form-expression/dynamic-form-field-expressions';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { cloneObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormFieldClassType } from './dynamic-form-field-class-type';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldOptions } from './dynamic-form-field-options';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFn } from './dynamic-form-field-validator';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>
> extends DynamicFormElement<Template, Definition, DynamicFormFieldExpressionData, DynamicFormFieldExpressions> {

  protected _root: DynamicForm;
  protected _parent: DynamicFormField;

  protected _model: any;
  protected _options: DynamicFormFieldOptions;
  protected _control: Control;

  protected _actions: DynamicFormAction[] = [];

  protected _validators: DynamicFormFieldValidator[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition) {
    super(definition);
    this._root = root;
    this._parent = parent;
    this._options = this.createOptions();
  }

  get root(): DynamicForm { return this._root; }
  get parent(): DynamicFormField { return this._parent; }

  get id(): string { return this.definition.id; }
  get key(): string { return this.definition.key; }
  get index(): number { return this.definition.index; }
  get path(): string {
    const parentPath = this.parent && this.parent.path;
    return parentPath ? `${parentPath}.${this.key}` : this.key || null;
  }
  get classType(): DynamicFormClassType { return 'field'; }

  get model(): any { return this._model; }
  get options(): DynamicFormFieldOptions { return this._options; }

  get control(): Control { return this._control; }
  get status(): string { return this._control.status; }

  get hidden(): boolean { return this.parent.hidden || this.template.hidden || false; }
  get readonly(): boolean { return this.parent.readonly || this.template.readonly || false; }

  get actions(): DynamicFormAction[] { return this._actions; }
  get wrappers(): string[] { return this.definition.wrappers; }

  get validators(): DynamicFormFieldValidator[] { return this._validators; }

  get unregistered(): boolean { return this.definition.unregistered; }

  initId(id: string): void {
    this._definition.id = id;
  }

  initActions(actions: DynamicFormAction[]): void {
    this._actions = actions;
  }

  initValidators(validators: DynamicFormFieldValidator[]): void {
    this._validators = validators || [];
    this._control.setValidators(this.getValidatorFunctions());
  }

  abstract get fieldClassType(): DynamicFormFieldClassType;

  abstract check(): void;
  abstract destroy(): void;

  abstract reset(): void;
  abstract resetDefault(): void;
  abstract validate(): void;

  protected filterFields(elements: DynamicFormElement[]): DynamicFormField[] {
    return elements.reduce((result, element) => {
      if (element.classType === 'field') {
        return result.concat(element as DynamicFormField);
      }
      if (element.elements) {
        return result.concat(this.filterFields(element.elements));
      }
      return result;
    }, <DynamicFormField[]>[]);
  }

  protected checkControl(): void {
    const disabled = (this.parent && this.parent.control.disabled) || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      return disabled ? this.control.disable() : this.control.enable();
    }
  }

  protected checkValidators(): void {
    const validatorsChanged = this.validatorsChanged();
    if (validatorsChanged) {
      this.control.setValidators(this.getValidatorFunctions());
      this.control.updateValueAndValidity();
    }
  }

  protected cloneObject<T>(obj: T): T {
    return cloneObject(obj);
  }

  protected createExpressionData(): DynamicFormFieldExpressionData {
    const expressionData = {} as DynamicFormFieldExpressionData;
    assignExpressionData(expressionData, {
      id: () => this.id,
      key: () => this.key,
      index: () => this.index,
      model: () => this.model,
      status: () => this.control.status,
      parent: () => this.parent ? this.parent.expressionData : undefined,
      root: () => this.root ? this.root.expressionData : undefined
    });
    return expressionData;
  }

  private getValidatorFunctions(): DynamicFormFieldValidatorFn[] {
    return this._validators
      .filter(validator => !!validator.validatorFn)
      .map(validator => validator.validatorFn);
  }

  private validatorsChanged(): boolean {
    return this._validators
      .map(validator => validator.checkChanges())
      .some(change => !!change);
  }

  private createOptions(): DynamicFormFieldOptions {
    const defaultOptions = <DynamicFormFieldOptions>{ autoGeneratedId: false, update: 'change' };
    const rootOptions = this.root && this.root.options || {};
    const parentOptions = this.parent && this.parent.options || {};
    const options = this.definition.options || {};
    return { ...defaultOptions, ...rootOptions, ...parentOptions, ...options };
  }
}
