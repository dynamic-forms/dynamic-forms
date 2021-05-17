import { FormArray } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormArrayDefinition } from './dynamic-form-array-definition';
import { DynamicFormArrayTemplate } from './dynamic-form-array-template';
import { DynamicFormArrayValidator } from './dynamic-form-array-validator';

export class DynamicFormArray<
  Template extends DynamicFormArrayTemplate = DynamicFormArrayTemplate,
  Definition extends DynamicFormArrayDefinition<Template> = DynamicFormArrayDefinition<Template>
> extends DynamicFormField<FormArray, Template, Definition, DynamicFormField> {

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition) {
    super(builder, root, parent, definition);
    this._model = this.getModel(definition);
    this._control = new FormArray([]);
    this.extendExpressionData({ length: () => this.length });
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'array'; }

  get length(): number { return this._children.length; }

  pushField(element: DynamicFormField): void {
    this._children.push(element);
    this._control.push(element.control);
    this._control.markAsTouched();
  }

  popField(): void {
    const length = this.length;
    if (length > 0) {
      this._children.pop().destroy();
      this._model.pop();
      this._control.removeAt(length - 1);
      this._control.markAsTouched();
    }
  }

  removeField(index: number): void {
    if (index >= 0 && index < this.length) {
      this._children.splice(index, 1).forEach(field => field.destroy());
      this._children.forEach((field, idx) => {
        field.definition.key = `${idx}`;
        field.definition.index = idx;
      });
      this._model.splice(index, 1);
      this._control.removeAt(index);
      this._control.markAsTouched();
    }
  }

  clearFields(): void {
    const length = this.length;
    if (length > 0) {
      this._children.forEach(field => field.destroy());
      this._control.clear();
      this._children = [];
      this._model = [];
      this.parentField.model[this.key] = this._model;
      this._control.markAsTouched();
    }
  }

  moveFieldDown(index: number): void {
    if (index >= 0 && index < this.length - 1) {
      const field = this._children.splice(index, 1)[0];
      this._children.splice(index + 1, 0, field);
      this._children[index].definition.index = index;
      this._children[index + 1].definition.index = index + 1;
      const value = this._model.splice(index, 1)[0];
      this._model.splice(index + 1, 0, value);
      this._control.removeAt(index);
      this._control.insert(index + 1, field.control);
      this._control.markAsTouched();
    }
  }

  moveFieldUp(index: number): void {
    if (index >= 1 && index < this.length) {
      const field = this._children.splice(index, 1)[0];
      this._children.splice(index - 1, 0, field);
      this._children[index - 1].definition.index = index - 1;
      this._children[index].definition.index = index;
      const value = this._model.splice(index, 1)[0];
      this._model.splice(index - 1, 0, value);
      this._control.removeAt(index);
      this._control.insert(index - 1, field.control);
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

  resetDefault(): void {
    if (this.definition.defaultValue) {
      const defaultModel = this.cloneObject(this.definition.defaultValue);
      this._control.patchValue(defaultModel);
    } else {
      this._children.forEach(field => field.resetDefault());
    }
  }

  validate(): void {
    this._children.forEach(field => field.validate());
    this._control.markAsTouched();
  }

  protected getChildren(): DynamicFormField[] {
    return this._builder.createFormArrayElements(this);
  }

  protected initChildren(): void {
    super.initChildren();
    this._children.forEach((field, index) => {
      this._control.insert(index, field.control);
    });
  }

  protected getValidators(): DynamicFormArrayValidator[] {
    return this._builder.createArrayValidators(this);
  }

  private getModel(definition: DynamicFormArrayDefinition): any {
    this.parentField.model[definition.key] = this.parentField.model[definition.key] || this.getDefaultModel(definition);
    return this.parentField.model[definition.key];
  }

  private getDefaultModel(definition: DynamicFormArrayDefinition): any {
    if (definition.defaultValue) {
      return this.cloneObject(definition.defaultValue);
    }
    return Array.from({ length: definition.defaultLength || 0 });
  }
}
