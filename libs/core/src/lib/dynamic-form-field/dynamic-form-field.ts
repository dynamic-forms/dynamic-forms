import { DynamicForm } from '../dynamic-form/dynamic-form';
import { cloneObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicFormFieldClassType } from './dynamic-form-field-class-type';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressions } from './dynamic-form-field-expressions';
import { DynamicFormFieldSettings } from './dynamic-form-field-settings';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldType } from './dynamic-form-field-type';
import {
  DynamicFormFieldAsyncValidatorFn,
  DynamicFormFieldValidatorBase,
  DynamicFormFieldValidatorFn,
} from './dynamic-form-field-validator';

export abstract class DynamicFormField<
  Value = any,
  Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Value, Template> = DynamicFormFieldDefinition<Value, Template>,
  Type extends DynamicFormFieldType = DynamicFormFieldType,
  Child extends DynamicFormElement = DynamicFormElement,
> extends DynamicFormElement<Template, Definition, Child, DynamicFormFieldExpressionData, DynamicFormFieldExpressions, Type> {
  protected _settings: DynamicFormFieldSettings;

  protected _depth: number;
  protected _model: Model;
  protected _parameters: any;

  protected _control: Control;

  protected _validators: DynamicFormFieldValidatorBase[] = [];

  protected _headerActions: DynamicFormAction[] = [];
  protected _footerActions: DynamicFormAction[] = [];

  constructor(
    builder: DynamicFormBuilder,
    root: DynamicForm,
    parent: DynamicFormElement,
    definition: Definition,
    type: Type,
    control?: Control,
  ) {
    super(builder, root, parent, definition, type);
    this._control = control;
    this._depth = this.getDepth();
    this._settings = this.createSettings();
  }

  override get classType(): DynamicFormClassType {
    return 'field';
  }

  get key(): string {
    return this.definition.key;
  }

  get index(): number {
    return this.definition.index;
  }

  get depth(): number {
    return this._depth;
  }

  get path(): string {
    const parentPath = this.parentField && this.parentField.path;
    return parentPath ? `${parentPath}.${this.key}` : this.key || null;
  }

  get settings(): DynamicFormFieldSettings {
    return this._settings;
  }

  get model(): Model {
    return this._model;
  }

  get value(): Value {
    return this._control.value;
  }

  get valid(): boolean {
    return this._control.valid;
  }

  get status(): string {
    return this._control.status;
  }

  get control(): Control {
    return this._control;
  }

  get disabled(): boolean {
    return this.control.disabled;
  }

  get readonly(): boolean {
    return this.template.readonly || this.parentField.readonly || false;
  }

  get wrappers(): string[] {
    return this.definition.wrappers;
  }

  get unregistered(): boolean {
    return this.definition.unregistered;
  }

  get hasValidation(): boolean {
    return this._validators.length > 0;
  }

  get validators(): DynamicFormFieldValidatorBase[] {
    return this._validators;
  }

  get errors(): DynamicFormValidationErrors {
    return this.control.errors;
  }

  get hasErrors(): boolean {
    return (this.errors || false) && true;
  }

  get showErrors(): boolean {
    return this.hasErrors && this.control.touched;
  }

  get headerActions(): DynamicFormAction[] {
    return this._headerActions;
  }

  get footerActions(): DynamicFormAction[] {
    return this._footerActions;
  }

  override init(): void {
    super.init();
    this.initValidators();
    this.initHeaderActions();
    this.initFooterActions();
  }

  abstract get fieldClassType(): DynamicFormFieldClassType;

  abstract check(): void;
  abstract destroy(): void;

  clear(): void {
    this.resetEmpty();
    this.validate();
  }

  abstract reset(): void;
  abstract resetEmpty(): void;
  abstract resetDefault(): void;
  abstract validate(): void;

  protected getId(): string {
    return this._builder.getFieldId(this);
  }

  protected override initId(): void {
    this.definition.id = this.getId();
  }

  protected get defaultValue(): Value {
    return this.definition.defaultValue;
  }

  protected override getExpressions(): DynamicFormFieldExpressions {
    return this._builder.createFieldExpressions(this);
  }

  protected override initExpressions(): void {
    super.initExpressions();
    this.afterInitExpressions();
  }

  protected afterInitExpressions(): void {}

  protected abstract override getChildren(): Child[];
  protected abstract getValidators(): DynamicFormFieldValidatorBase[];

  protected initValidators(): void {
    this._validators = this.getValidators() || [];
    this._control.setValidators(this.getValidatorFunctions());
    this._control.setAsyncValidators(this.getAsyncValidatorFunctions());
  }

  protected getHeaderActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.root, this, this.definition.headerActions);
  }

  protected initHeaderActions(): void {
    this._headerActions = this.getHeaderActions() || [];
  }

  protected getFooterActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.root, this, this.definition.footerActions);
  }

  protected initFooterActions(): void {
    this._footerActions = this.getFooterActions() || [];
  }

  protected checkControl(): void {
    const disabled = (this.parentField && this.parentField.control.disabled) || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      return disabled ? this.control.disable() : this.control.enable();
    }
  }

  protected checkValidators(): void {
    const validatorsChanged = this.validatorsChanged();
    if (validatorsChanged) {
      this._control.setValidators(this.getValidatorFunctions());
      this._control.setAsyncValidators(this.getAsyncValidatorFunctions());
      this._control.updateValueAndValidity();
    }
  }

  protected cloneObject<T>(obj: T): T {
    return cloneObject(obj);
  }

  protected override createExpressionData(): DynamicFormFieldExpressionData {
    const expressionData = super.createExpressionData() as DynamicFormFieldExpressionData;
    assignExpressionData(expressionData, {
      key: () => this.key,
      index: () => this.index,
      depth: () => this.depth,
      disabled: () => this.disabled,
      readonly: () => this.readonly,
      model: () => this.model,
      value: () => this.value,
      valid: () => this.valid,
      status: () => this.status,
    });
    return expressionData;
  }

  private getValidatorFunctions(): DynamicFormFieldValidatorFn[] {
    return this._validators
      .filter(validator => !!validator.validatorFn && !validator.async)
      .map(validator => validator.validatorFn as DynamicFormFieldValidatorFn);
  }

  private getAsyncValidatorFunctions(): DynamicFormFieldAsyncValidatorFn[] {
    return this._validators
      .filter(validator => !!validator.validatorFn && validator.async)
      .map(validator => validator.validatorFn as DynamicFormFieldAsyncValidatorFn);
  }

  private validatorsChanged(): boolean {
    return this._validators.map(validator => validator.checkChanges()).some(change => !!change);
  }

  private getDepth(): number {
    return this.parentField ? this.parentField.depth + 1 : 0;
  }

  private createSettings(): DynamicFormFieldSettings {
    const defaultSettings = { autoGeneratedId: false, updateType: 'change' } as DynamicFormFieldSettings;
    const rootSettings = (this.root && this.root.settings) || {};
    const parentSettings = (this.parentField && this.parentField.settings) || {};
    const options = this.definition.settings || {};
    return { ...defaultSettings, ...rootSettings, ...parentSettings, ...options };
  }
}
