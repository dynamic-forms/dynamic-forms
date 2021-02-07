import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormContainerTemplate } from './dynamic-form-container-template';

export interface DynamicFormContainerDefinition<
  Template extends DynamicFormContainerTemplate = DynamicFormContainerTemplate
> extends DynamicFormElementDefinition<Template> {
  children: DynamicFormElementDefinition[];
}
