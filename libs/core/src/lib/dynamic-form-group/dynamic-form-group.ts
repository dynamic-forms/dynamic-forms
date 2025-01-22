import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { FormGroupBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupAsyncValidator, DynamicFormGroupValidator } from './dynamic-form-group-validator';

export class DynamicFormGroup<
  Value extends Record<string, any> = any,
  Model extends Value = Value,
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Value, Template> = DynamicFormGroupDefinition<Value, Template>,
  Type extends DynamicFormFieldType = DynamicFormFieldType,
> extends DynamicFormField<Value, Model, FormGroupBase<Value>, Template, Definition, Type> {
  protected _fields: DynamicFormField[] = [];

  readonly fieldClassType: DynamicFormFieldClassType = 'group';

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition, type: Type);
  /** @internal */
  constructor(builder: DynamicFormBuilder, definition: Definition, model: Model);
  constructor(builder: DynamicFormBuilder, ...params: any[]) {
    const { root, parent, definition, type, model } =
      params.length === 4
        ? { root: params[0], parent: params[1], definition: params[2], type: params[3], model: null }
        : { root: null, parent: null, definition: params[0], type: null, model: params[1] };
    super(builder, root, parent, definition, type, new FormGroupBase<Value>({} as any));
    this._model = model || this.getModel();
    this._parameters = {};
  }

  override get children(): DynamicFormElement[] {
    return this._children;
  }

  get fields(): DynamicFormField[] {
    return this._fields;
  }

  check(): void {
    this.checkControl();
    this.checkValidators();
    this._fields.forEach(field => field.check());
  }

  destroy(): void {
    this._fields.forEach(field => field.destroy());
  }

  reset(): void {
    this._fields.forEach(field => field.reset());
  }

  resetEmpty(): void {
    this._fields.forEach(field => field.resetEmpty());
  }

  resetDefault(): void {
    if (this.defaultValue) {
      const defaultModel = this.cloneObject(this.defaultValue);
      this._control.patchValue(defaultModel);
    } else {
      this._fields.forEach(field => field.resetDefault());
    }
  }

  validate(): void {
    this._control.markAsTouched();
    this._fields.forEach(field => field.validate());
  }

  protected getChildren(): DynamicFormElement[] {
    return this._builder.createFormElements(this.root, this, this.definition.children);
  }

  protected getValidators(): (DynamicFormGroupValidator | DynamicFormGroupAsyncValidator)[] {
    return this._builder.createGroupValidators(this);
  }

  protected override initChildren(): void {
    super.initChildren();
    this._fields = this.filterFields(this._children);
    this._fields
      .filter(field => !field.unregistered)
      .forEach(field => {
        this._control.registerControl(field.definition.key, field.control);
      });
  }

  private getModel(): Model {
    this.parentField.model[this.key] = this.parentField.model[this.key] || this.getDefaultModel();
    return this.parentField.model[this.key];
  }

  private getDefaultModel(): Model {
    if (this.defaultValue) {
      return this.cloneObject<Model>(this.defaultValue as Model);
    }
    return {} as Model;
  }

  private filterFields(elements: DynamicFormElement[]): DynamicFormField[] {
    return elements.reduce((result, element) => {
      if (element.classType === 'field') {
        return result.concat(element as DynamicFormField);
      }
      if (element.children) {
        return result.concat(this.filterFields(element.children));
      }
      return result;
    }, [] as DynamicFormField[]);
  }
}
