import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionDefinition } from './dynamic-form-action-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export abstract class DynamicFormActionBase<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate,
  Definition extends DynamicFormActionDefinition<Template> = DynamicFormActionDefinition<Template>,
  Field extends DynamicFormField = DynamicFormField
> extends DynamicFormElementBase<Template, Definition, DynamicFormAction<Template, Definition, Field>> {

  constructor() {
    super();
  }

  get action() { return this.element; }
  set action(action: DynamicFormAction<Template, Definition, Field>) { this.element = action; }

  get disabled() { return this.element.disabled; }
}
