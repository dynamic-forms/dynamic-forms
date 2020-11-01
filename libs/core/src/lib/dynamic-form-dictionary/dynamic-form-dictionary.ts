import { FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormDictionaryDefinition } from './dynamic-form-dictionary-definition';
import { DynamicFormDictionaryTemplate } from './dynamic-form-dictionary-template';

export class DynamicFormDictionary<
  Template extends DynamicFormDictionaryTemplate = DynamicFormDictionaryTemplate,
  Definition extends DynamicFormDictionaryDefinition<Template> = DynamicFormDictionaryDefinition<Template>
> extends DynamicFormField<FormGroup, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition) {
    super(root, parent, definition);
    this._model = this.getModel(parent, definition);
    this._control = new FormGroup({});
    this.extendExpressionData({ length: () => this.length });
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'dictionary'; }

  get elements(): DynamicFormElement[] { return this._elements; }
  get fields(): DynamicFormField[] { return this._fields; }

  get length(): number { return this._fields.length; }

  initElements(elements: DynamicFormField[]): void {
    this._fields = elements ? [ ...elements ] : [];
    this._fields.filter(field => !field.unregistered).forEach(field => {
      this._control.registerControl(field.definition.key, field.control);
    });
    this._elements = this._fields;
  }

  registerField(field: DynamicFormField): void {
    const index = this._fields.findIndex(f => f.key === field.key);
    if (index >= 0) {
      this._fields[index] = field;
    } else {
      this._fields.push(field);
    }
    this._control.registerControl(field.key, field.control);
    this._control.markAsTouched();
  }

  removeField(key: string): void {
    const index = this._fields.findIndex(field => field.key === key);
    if (index >= 0 && index < this.length) {
      this._fields.splice(index, 1).forEach(field => field.destroy());
      delete this._model[key];
      this._control.removeControl(key);
      this._control.markAsTouched();
    }
  }

  clearFields(): void {
    const length = this.length;
    if (length > 0) {
      this._fields.map(field => {
        this._control.removeControl(field.key);
        field.destroy();
      });
      this._fields = [];
      this._model = {};
      this._control.markAsTouched();
      this._elements = this._fields;
    }
  }

  check(): void {
    this.checkControl();
    this.checkValidators();
    this.fields.forEach(field => field.check());
  }

  destroy(): void {
    this.fields.forEach(field => field.destroy());
  }

  reset(): void {
    this.fields.forEach(field => field.reset());
  }

  resetDefault(): void {
    if (this.definition.defaultValue) {
      const defaultModel = this.cloneObject(this.definition.defaultValue);
      this._control.patchValue(defaultModel);
    } else {
      this.fields.forEach(field => field.resetDefault());
    }
  }

  validate(): void {
    this.fields.forEach(field => field.validate());
    this._control.markAsTouched();
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormDictionaryDefinition): any {
    parent.model[definition.key] = parent.model[definition.key] || this.getDefaultModel(definition);
    return parent.model[definition.key];
  }

  private getDefaultModel(definition: DynamicFormDictionaryDefinition): any {
    if (definition.defaultValue) {
      return this.cloneObject(definition.defaultValue);
    }
    return (definition.defaultKeys || []).reduce((result, key) => {
      result[key] = undefined;
      return result;
    }, {});
  }
}
