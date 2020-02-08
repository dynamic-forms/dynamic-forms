import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export abstract class DynamicFormActionBase<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
> extends DynamicFormElementBase<Template, Definition, DynamicFormAction<Template, Definition>> {

  constructor() {
    super();
  }

  get action() { return this.element; }
  set action(action: DynamicFormAction<Template, Definition>) { this.element = action; }
}
