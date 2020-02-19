import { FormArray } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';

export class DynamicFormArray<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>
> extends DynamicFormField<FormArray, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._model = this.getModel(parent, definition);
    this._control = new FormArray([]);
  }

  get elements() { return this._elements; }
  get fields() { return this._fields; }

  initElements(elements: DynamicFormField[]) {
    this._elements = elements || [];
    this._fields = elements || [];
    this._fields.forEach((field, index) => {
      this._control.insert(index, field.control);
    });
  }

  check() {
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  reset() {
    this.fields.forEach(field => field.reset());
  }

  resetDefault() {
    if (this.definition.defaultValue) {
      const defaultModel = this.cloneObject(this.definition.defaultValue);
      this._control.patchValue(defaultModel);
    } else {
      this.fields.forEach(field => field.resetDefault());
    }
  }

  validate() {
    this.fields.forEach(field => field.validate());
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormArrayDefinition) {
    parent.model[definition.key] = parent.model[definition.key] || this.getDefaultModel(definition);
    return parent.model[definition.key];
  }

  private getDefaultModel(definition: DynamicFormArrayDefinition) {
    if (definition.defaultValue) {
      return this.cloneObject(definition.defaultValue);
    }
    return Array.from({ length: definition.defaultLength || 0 });
  }
}
