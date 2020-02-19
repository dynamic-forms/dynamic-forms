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
    this._fields = elements ? [ ...elements ] : [];
    this._fields.forEach((field, index) => {
      field.definition.key = `${index}`;
      field.definition.index = index;
      this._control.insert(index, field.control);
    });
    this._elements = this._fields;
  }

  insertElement(index: number, element: DynamicFormField) {
    if (index >= 0 && index <= this._fields.length) {
      this._fields.splice(index, 0, element);
      this._fields.forEach((field, idx) => {
        if (idx >= index) {
          field.definition.key = `${idx}`;
          field.definition.index = idx;
        }
      });
      this._control.insert(index, element.control);
    }
  }

  pushElement(element: DynamicFormField) {
    const index = this._fields.length;
    element.definition.key = `${index}`;
    element.definition.index = index;
    this._fields.push(element);
    this._control.push(element.control);
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
