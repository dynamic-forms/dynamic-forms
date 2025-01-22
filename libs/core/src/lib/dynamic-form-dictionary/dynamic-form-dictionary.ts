import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { FormRecordBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';
import { DynamicFormDictionaryAsyncValidator, DynamicFormDictionaryValidator } from './dynamic-form-dictionary-validator';

export class DynamicFormDictionary<
  Value = any,
  Model extends Value = Value,
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Value, Template> = DynamicFormDictionaryDefinition<Value, Template>,
  Type extends DynamicFormFieldType = DynamicFormFieldType,
> extends DynamicFormField<
  Record<string, Value>,
  Record<string, Model>,
  FormRecordBase<Value>,
  Template,
  Definition,
  Type,
  DynamicFormField<Value, Model>
> {
  readonly fieldClassType: DynamicFormFieldClassType = 'dictionary';

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition, type: Type) {
    super(builder, root, parent, definition, type, new FormRecordBase({}));
    this.initModel(this.getModel());
    this.extendExpressionData({ length: () => this.length });
  }

  get length(): number {
    return this._children.length;
  }

  registerField(field: DynamicFormField<Value, Model>): void {
    const index = this._children.findIndex(f => f.key === field.key);
    if (index >= 0) {
      this._children[index] = field;
    } else {
      this._children.push(field);
    }
    this._control.registerControl(field.key, field.control);
    this._control.markAsTouched();
  }

  removeField(key: string): void {
    const index = this._children.findIndex(field => field.key === key);
    if (index >= 0 && index < this.length) {
      this._children.splice(index, 1).forEach(field => field.destroy());
      delete this._model[key];
      this._control.removeControl(key);
      this._control.markAsTouched();
    }
  }

  clearFields(): void {
    const length = this.length;
    if (length > 0) {
      this._children.forEach(field => {
        field.destroy();
        this._control.removeControl(field.key);
      });
      this._children = [];
      this._model = {};
      this.parentField.model[this.key] = this._model;
      this._control.markAsTouched();
    }
  }

  check(): void {
    this.checkControl();
    this.checkValidators();
    this._children.forEach(field => field.check());
  }

  destroy(): void {
    this._children.forEach(field => field.destroy());
  }

  reset(): void {
    this._children.forEach(field => field.reset());
  }

  resetEmpty(): void {
    this._children.forEach(field => field.destroy());
    Object.keys(this._control.controls).forEach(key => {
      this._control.removeControl(key);
    });
    this.initModel({});
    this._children = [];
  }

  resetDefault(): void {
    this._children.forEach(field => field.destroy());
    Object.keys(this._control.controls).forEach(key => {
      this._control.removeControl(key);
    });
    this.initModel(this.getDefaultModel());
    this.initChildren();
  }

  validate(): void {
    this._children.forEach(field => field.validate());
    this._control.markAsTouched();
  }

  protected getChildren(): DynamicFormField<Value, Model>[] {
    return this._builder.createFormDictionaryElements(this);
  }

  protected override initChildren(): void {
    super.initChildren();
    this._children
      .filter(field => !field.unregistered)
      .forEach(field => {
        this._control.registerControl(field.definition.key, field.control);
      });
  }

  protected getValidators(): (DynamicFormDictionaryValidator | DynamicFormDictionaryAsyncValidator)[] {
    return this._builder.createDictionaryValidators(this);
  }

  private initModel(model: any): void {
    this.parentField.model[this.definition.key] = model;
    this._model = this.parentField.model[this.definition.key];
  }

  private getModel(): any {
    return this.parentField.model[this.definition.key] || this.getDefaultModel();
  }

  private getDefaultModel(): any {
    if (this.definition.defaultValue) {
      return this.cloneObject(this.definition.defaultValue);
    }
    return (this.definition.defaultKeys || []).reduce((result, key) => {
      result[key] = undefined;
      return result;
    }, {});
  }
}
