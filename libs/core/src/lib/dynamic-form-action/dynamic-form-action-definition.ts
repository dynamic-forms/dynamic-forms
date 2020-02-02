import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export interface DynamicFormActionDefinition<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate
> extends DynamicFormElementDefinition<Template> {}
