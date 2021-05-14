import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { assignExpressionData } from '../dynamic-form-expression/dynamic-form-expression-helpers';
import { DynamicFormValidationErrors } from '../dynamic-form-validation/dynamic-form-validation-errors';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { cloneObject } from '../dynamic-form/dynamic-form-helpers';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormFieldClassType } from './dynamic-form-field-class-type';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressions } from './dynamic-form-field-expressions';
import { DynamicFormFieldSettings } from './dynamic-form-field-settings';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFn } from './dynamic-form-field-validator';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Child extends DynamicFormElement = DynamicFormElement
> extends DynamicFormElement<Template, Definition, Child, DynamicFormFieldExpressionData, DynamicFormFieldExpressions> {

  protected _settings: DynamicFormFieldSettings;

  protected _depth: number;
  protected _model: any;
  protected _parameters: any;

  protected _control: Control;

  protected _validators: DynamicFormFieldValidator[] = [];

  protected _headerActions: DynamicFormAction[] = [];
  protected _footerActions: DynamicFormAction[] = [];

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(builder, root, parent, definition);
    this._depth = this.getDepth();
    this._settings = this.createSettings();
  }

  get settings(): DynamicFormFieldSettings { return this._settings; }

  get key(): string { return this.definition.key; }
  get index(): number { return this.definition.index; }
  get depth(): number { return this._depth; }
  get path(): string {
    const parentPath = this.parentField && this.parentField.path;
    return parentPath ? `${parentPath}.${this.key}` : this.key || null;
  }
  get classType(): DynamicFormClassType { return 'field'; }

  get model(): any { return this._model; }
  get value(): any { return this._control.value; }
  get valid(): boolean { return this._control.valid; }
  get status(): string { return this._control.status; }
  get control(): Control { return this._control; }

  get hidden(): boolean { return this.parentField.hidden || this.template.hidden || false; }
  get readonly(): boolean { return this.parentField.readonly || this.template.readonly || false; }

  get wrappers(): string[] { return this.definition.wrappers; }
  get unregistered(): boolean { return this.definition.unregistered; }

  get validators(): DynamicFormFieldValidator[] { return this._validators; }

  get errors(): DynamicFormValidationErrors { return this.control.errors; }
  get hasErrors(): boolean { return (this.errors || false) && true; }
  get showErrors(): boolean { return this.hasErrors && this.control.touched; }

  get headerActions(): DynamicFormAction[] { return this._headerActions; }
  get footerActions(): DynamicFormAction[] { return this._footerActions; }

  init(): void {
    super.init();
    this.initValidators();
    this.initHeaderActions();
    this.initFooterActions();
  }

  abstract get fieldClassType(): DynamicFormFieldClassType;

  abstract check(): void;
  abstract destroy(): void;

  abstract reset(): void;
  abstract resetDefault(): void;
  abstract validate(): void;

  protected initId(): void {
    this.definition.id = this._builder.getFieldId(this);
  }

  protected initExpressions(): void {
    super.initExpressions();
    this.afterInitExpressions();
  }

  protected getExpressions(): DynamicFormFieldExpressions {
    return this._builder.createFieldExpressions(this);
  }

  protected afterInitExpressions(): void {}

  protected abstract getChildren(): Child[];

  protected initValidators(): void {
    this._validators = this.getValidators() || [];
    this._control.setValidators(this.getValidatorFunctions());
  }

  protected abstract getValidators(): DynamicFormFieldValidator[];

  protected initHeaderActions(): void {
    this._headerActions = this.getHeaderActions() || [];
  }

  protected getHeaderActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.root, this, this.definition.headerActions);
  }

  protected initFooterActions(): void {
    this._footerActions = this.getFooterActions() || [];
  }

  protected getFooterActions(): DynamicFormAction[] {
    return this._builder.createFormActions(this.root, this, this.definition.footerActions);
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
      this.control.setValidators(this.getValidatorFunctions());
      this.control.updateValueAndValidity();
    }
  }

  protected cloneObject<T>(obj: T): T {
    return cloneObject(obj);
  }

  protected createExpressionData(): DynamicFormFieldExpressionData {
    const expressionData = super.createExpressionData() as DynamicFormFieldExpressionData;
    assignExpressionData(expressionData, {
      id: () => this.id,
      key: () => this.key,
      index: () => this.index,
      depth: () => this.depth,
      model: () => this.model,
      value: () => this.value,
      valid: () => this.valid,
      status: () => this.status
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

  private getDepth(): number {
    return this.parentField ? this.parentField.depth + 1 : 0;
  }

  private createSettings(): DynamicFormFieldSettings {
    const defaultSettings = { autoGeneratedId: false, updateType: 'change' } as DynamicFormFieldSettings;
    const rootSettings = this.root && this.root.settings || {};
    const parentSettings = this.parentField && this.parentField.settings || {};
    const options = this.definition.settings || {};
    return { ...defaultSettings, ...rootSettings, ...parentSettings, ...options };
  }
}
