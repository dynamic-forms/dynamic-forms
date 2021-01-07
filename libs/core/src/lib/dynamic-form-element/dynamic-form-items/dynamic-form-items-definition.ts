import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export interface DynamicFormItemsDefinition<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  ItemDefinition extends DynamicFormItemDefinition = DynamicFormItemDefinition
> extends DynamicFormElementDefinition<Template> {
  elements: undefined;
  items: ItemDefinition[];
}
