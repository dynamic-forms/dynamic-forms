import { DynamicFormActionDefinition } from '../dynamic-form-action-definition';
import { DynamicFormIconTemplate } from './dynamic-form-icon-template';

export interface DynamicFormIconDefinition<
  Template extends DynamicFormIconTemplate = DynamicFormIconTemplate,
> extends DynamicFormActionDefinition<Template> {}
