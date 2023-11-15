import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormItemDefinition } from './dynamic-form-item-definition';
import { DynamicFormItemTemplate } from './dynamic-form-item-template';
import { DynamicFormItemsTemplate } from './dynamic-form-items-template';

export interface DynamicFormItemsDefinition<
  Template extends DynamicFormItemsTemplate = DynamicFormItemsTemplate,
  ItemTemplate extends DynamicFormItemTemplate = DynamicFormItemTemplate,
  ItemDefinition extends DynamicFormItemDefinition<ItemTemplate> = DynamicFormItemDefinition<ItemTemplate>,
> extends DynamicFormElementDefinition<Template> {
  children: ItemDefinition[];
}
