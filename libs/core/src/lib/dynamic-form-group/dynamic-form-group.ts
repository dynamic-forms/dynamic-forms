import { FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export class DynamicFormGroup extends DynamicFormField<FormGroup, DynamicFormGroupTemplate, DynamicFormGroupDefinition> {
  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicFormField, parent: DynamicFormField, definition: DynamicFormGroupDefinition, model: any = null) {
    super(root, parent, definition);
    this._model = model || this.createModel(parent, definition);
    this._control = new FormGroup({});
  }

  get elements() { return this._elements; }
  get fields() { return this._fields; }

  setElements(elements: DynamicFormElement[]) {
    this._elements = elements || [];
    this._fields = this.getFields(this._elements);
    this._fields.forEach(field => {
      this._control.registerControl(field.definition.key, field.control);
    });
  }

  check() {
    this.checkControl();
    this.fields.forEach(field => field.check());
  }

  destroy() {
    this.fields.forEach(field => field.destroy());
  }

  reset() {
    this.fields.forEach(field => field.reset());
  }

  resetDefault() {
    this.fields.forEach(field => field.resetDefault());
  }

  validate() {
    this.fields.forEach(field => field.validate());
  }

  private createModel(parent: DynamicFormField, definition: DynamicFormGroupDefinition): any {
    parent.model[definition.key] = parent.model[definition.key] || {};
    return parent.model[definition.key];
  }

  private checkControl(): void {
    const disabled = (this.parent && this.parent.control.disabled) || this.template.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  private getFields(elements: DynamicFormElement[]): DynamicFormField[] {
    return elements.reduce((result, element) => {
      if (!element.isElement) {
        return result.concat(element as DynamicFormField);
      }
      if (element.elements) {
        return result.concat(this.getFields(element.elements));
      }
      return result;
    }, <DynamicFormField[]>[]);
  }
}
