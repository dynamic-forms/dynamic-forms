import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormContentTemplate } from './dynamic-form-content-template';

export interface DynamicFormContentDefinition<
  Template extends DynamicFormContentTemplate = DynamicFormContentTemplate,
> extends DynamicFormElementDefinition<Template> {
  children?: undefined;
}
