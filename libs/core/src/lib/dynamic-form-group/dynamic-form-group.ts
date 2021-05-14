import { FormGroup } from '@angular/forms';
import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldClassType } from '../dynamic-form-field/dynamic-form-field-class-type';
import { DynamicForm } from '../dynamic-form/dynamic-form';
import { DynamicFormBuilder } from '../dynamic-form/dynamic-form.builder';
import { DynamicFormGroupDefinition } from './dynamic-form-group-definition';
import { DynamicFormGroupTemplate } from './dynamic-form-group-template';

export class DynamicFormGroup<
  Template extends DynamicFormGroupTemplate = DynamicFormGroupTemplate,
  Definition extends DynamicFormGroupDefinition<Template> = DynamicFormGroupDefinition<Template>
> extends DynamicFormField<FormGroup, Template, Definition> {

  protected _fields: DynamicFormField[] = [];

  constructor(builder: DynamicFormBuilder, root: DynamicForm, parent: DynamicFormElement, definition: Definition, model: any = null) {
    super(builder, root, parent, definition);
    this._control = new FormGroup({});
    this._model = model || this.getModel(definition);
    this._parameters = {};
  }

  get fieldClassType(): DynamicFormFieldClassType { return 'group'; }

  get children(): DynamicFormElement[] { return this._children; }
  get fields(): DynamicFormField[] { return this._fields; }

  init(): void {
    this.initId(this._builder.getFieldId(this));
    this.initExpressions(this._builder.createFieldExpressions(this));
    this.initChildren(this._builder.createFormElements(this.root, this, this.definition.children));
    this.initValidators(this._builder.createGroupValidators(this));
    this.initHeaderActions(this._builder.createFormActions(this.root, this, this.definition.headerActions));
    this.initFooterActions(this._builder.createFormActions(this.root, this, this.definition.footerActions));
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

  protected initChildren(children: DynamicFormElement[]): void {
    this._children = children || [];
    this._fields = this.filterFields(this._children);
    this._fields.filter(field => !field.unregistered).forEach(field => {
      this._control.registerControl(field.definition.key, field.control);
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
