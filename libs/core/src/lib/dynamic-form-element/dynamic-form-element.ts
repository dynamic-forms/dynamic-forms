import { DynamicFormClassType } from '../dynamic-form-config/dynamic-form-class-type';
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

  get definition() { return this._definition; }
  get template() { return this.definition.template; }

  get classType(): DynamicFormClassType { return 'element'; }
  get componentType() { return this.definition.type; }

  get elements() { return this._elements; }

  setElements(elements: DynamicFormElement[]) {
    this._elements = elements || [];
  }
}
