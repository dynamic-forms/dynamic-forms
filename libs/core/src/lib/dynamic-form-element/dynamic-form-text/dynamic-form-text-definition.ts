import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormTextTemplate } from './dynamic-form-text-template';

export interface DynamicFormTextDefinition<
  Template extends DynamicFormTextTemplate = DynamicFormTextTemplate,
> extends DynamicFormElementDefinition<Template> {
  children?: undefined;
}
