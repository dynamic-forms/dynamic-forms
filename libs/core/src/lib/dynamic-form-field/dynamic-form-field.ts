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
import { DynamicFormFieldSettings } from './dynamic-form-field-settings';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidator, DynamicFormFieldValidatorFn } from './dynamic-form-field-validator';

export abstract class DynamicFormField<
  Control extends DynamicFormFieldControl = DynamicFormFieldControl,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>
> extends DynamicFormElement<Template, Definition, DynamicFormFieldExpressionData, DynamicFormFieldExpressions> {

  protected _root: DynamicForm;
  protected _parent: DynamicFormField;
  protected _settings: DynamicFormFieldSettings;

  protected _model: any;
  protected _parameters: any;

  protected _control: Control;

  protected _validators: DynamicFormFieldValidator[] = [];

  protected _headerActions: DynamicFormAction[] = [];
  protected _footerActions: DynamicFormAction[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition) {
    super(definition);
    this._root = root;
    this._parent = parent;
    this._settings = this.createSettings();
  }

  get root(): DynamicForm { return this._root; }
  get parent(): DynamicFormField { return this._parent; }
  get settings(): DynamicFormFieldSettings { return this._settings; }

  get key(): string { return this.definition.key; }
  get index(): number { return this.definition.index; }
  get path(): string {
    const parentPath = this.parent && this.parent.path;
    return parentPath ? `${parentPath}.${this.key}` : this.key || null;
  }
  get classType(): DynamicFormClassType { return 'field'; }

  get model(): any { return this._model; }

  get control(): Control { return this._control; }
  get status(): string { return this._control.status; }

  get hidden(): boolean { return this.parent.hidden || this.template.hidden || false; }
  get readonly(): boolean { return this.parent.readonly || this.template.readonly || false; }

  get wrappers(): string[] { return this.definition.wrappers; }
  get unregistered(): boolean { return this.definition.unregistered; }

  get validators(): DynamicFormFieldValidator[] { return this._validators; }

  get headerActions(): DynamicFormAction[] { return this._headerActions; }
  get footerActions(): DynamicFormAction[] { return this._footerActions; }

  initExpressions(expressions: DynamicFormFieldExpressions): void {
    super.initExpressions(expressions);
    this.afterInitExpressions();
  }

  initValidators(validators: DynamicFormFieldValidator[]): void {
    this._validators = validators || [];
    this._control.setValidators(this.getValidatorFunctions());
  }

  initHeaderActions(actions: DynamicFormAction[]): void {
    this._headerActions = actions;
  }

  initFooterActions(actions: DynamicFormAction[]): void {
    this._footerActions = actions;
  }

  abstract get fieldClassType(): DynamicFormFieldClassType;

  abstract check(): void;
  abstract destroy(): void;

  abstract reset(): void;
  abstract resetDefault(): void;
  abstract validate(): void;

  protected afterInitExpressions(): void {}

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

  private createSettings(): DynamicFormFieldSettings {
    const defaultSettings = <DynamicFormFieldSettings>{ autoGeneratedId: false, updateType: 'change' };
    const rootSettings = this.root && this.root.settings || {};
    const parentSettings = this.parent && this.parent.settings || {};
    const options = this.definition.settings || {};
    return { ...defaultSettings, ...rootSettings, ...parentSettings, ...options };
  }
}
