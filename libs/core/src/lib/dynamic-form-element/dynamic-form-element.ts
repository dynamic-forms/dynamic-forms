import { DynamicFormElementDefinition } from './dynamic-form-element-definition';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export class DynamicFormElement<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate,
  Definition extends DynamicFormElementDefinition<Template> = DynamicFormElementDefinition<Template>
> {

  private _template: Template;

  constructor(readonly definition: Definition) {
    this._template = definition.template || <Template>{};
  }

  get type() { return this.definition.type; }
  get template() { return this._template; }

  get isField() { return false; }
}
