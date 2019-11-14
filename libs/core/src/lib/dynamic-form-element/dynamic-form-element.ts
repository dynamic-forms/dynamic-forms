import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>
> {
  private _template: Template;
  protected _elements: DynamicFormElement[] = [];

  constructor(readonly definition: Definition) {
    this._template = definition.template || <Template>{};
  }

  get isElement() { return true; }

  get type() { return this.definition.type; }
  get template() { return this._template; }

  get elements() { return this._elements; }

  setElements(elements: DynamicFormElement[]) {
    this._elements = elements || [];
  }
}
