import { DynamicFormElement } from '../dynamic-form-element';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemTemplate } from './dynamic-form-item-template';

export class DynamicFormItem<
  Template extends DynamicFormItemTemplate = DynamicFormItemTemplate,
  Definition extends DynamicFormItemDefinition<Template> = DynamicFormItemDefinition<Template>
> extends DynamicFormElement<Template, Definition> {

  constructor(definition: Definition) {
    super(definition);
  }

  get label(): string { return this.template.label; }
}
