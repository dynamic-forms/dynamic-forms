import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';
import { DynamicFormGroupAsyncValidator, DynamicFormGroupValidator } from './dynamic-form-group-validator';

export class DynamicFormGroup<
  TValue = any,
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>
> extends DynamicFormField<TValue, FormGroup<{ [Key in keyof TValue ]: AbstractControl<TValue[Key]> }>, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition);
  /** @internal */
  constructor(builder: DynamicFormBuilder, definition: Definition, model: any);
  constructor(builder: DynamicFormBuilder, ...params: any[]) {
    const { root, parent, definition, model } = params.length === 3
      ? { root: params[0], parent: params[1], definition: params[2], model: null }
      : { root: null, parent: null, definition: params[0], model: params[1] };
    super(builder, root, parent, definition);
    this._control = new FormGroup<{ [Key in keyof TValue ]: AbstractControl<TValue[Key]> }>({} as any);
    this._model = model || this.getModel(definition);
    this._parameters = {};
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'group'; }

  override get children(): DynamicFormElement[] { return this._children; }
  get fields(): DynamicFormField[] { return this._fields; }

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
    if (this.definition.defaultValue) {
      const defaultModel = this.cloneObject(this.definition.defaultValue);
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
    this._fields.filter(field => !field.unregistered).forEach(field => {
      this._control.registerControl(field.definition.key as any, field.control as any);
    });
  }

  private getModel(definition: DynamicFormGroupDefinition): any {
    this.parentField.model[definition.key] = this.parentField.model[definition.key] || this.getDefaultModel(definition);
    return this.parentField.model[definition.key];
  }

  private getDefaultModel(definition: DynamicFormGroupDefinition): any {
    if (definition.defaultValue) {
      return this.cloneObject(definition.defaultValue);
    }
    return {};
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
