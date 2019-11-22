import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>
> {
  protected _definition: Definition;
  protected _elements: DynamicFormElement[] = [];

  constructor(definition: Definition) {
    this._definition = definition;
    this._definition.template = definition.template || <Template>{};
  }

  get isElement() { return true; }

  get definition() { return this._definition; }
  get template() { return this.definition.template; }
  get type() { return this.definition.type; }

  get elements() { return this._elements; }

  setElements(elements: DynamicFormElement[]) {
    this._elements = elements || [];
  }
}
