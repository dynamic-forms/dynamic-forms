import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormItemTemplate } from './dynamic-form-item-template';

export interface DynamicFormItemDefinition<
  Template extends DynamicFormItemTemplate = DynamicFormItemTemplate,
> extends DynamicFormElementDefinition<Template> {
  index?: number;
}
