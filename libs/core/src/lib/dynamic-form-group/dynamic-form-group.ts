import { FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export class DynamicFormGroup<
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>
> extends DynamicFormField<FormGroup, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(root: DynamicForm, parent: DynamicFormField, definition: Definition, model: any = null) {
    super(root, parent, definition);
    this._control = new FormGroup({});
    this._model = model || this.getModel(parent, definition);
    this._parameters = {};
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'group'; }

  get children(): DynamicFormElement[] { return this._children; }
  get fields(): DynamicFormField[] { return this._fields; }

  initChildren(children: DynamicFormElement[]): void {
    this._children = children || [];
    this._fields = this.filterFields(this._children);
    this._fields.filter(field => !field.unregistered).forEach(field => {
      this._control.registerControl(field.definition.key, field.control);
    });
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
    this._control.markAsTouched();
    this.fields.forEach(field => field.validate());
  }

  private getModel(parent: DynamicFormField, definition: DynamicFormGroupDefinition): any {
    parent.model[definition.key] = parent.model[definition.key] || this.getDefaultModel(definition);
    return parent.model[definition.key];
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
