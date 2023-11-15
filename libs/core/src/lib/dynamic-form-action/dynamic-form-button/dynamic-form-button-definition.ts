import { DynamicFormActionDefinition } from '../dynamic-form-action-definition';
import { DynamicFormButtonTemplate } from './dynamic-form-button-template';

export interface DynamicFormButtonDefinition<Template extends DynamicFormButtonTemplate = DynamicFormButtonTemplate>
  extends DynamicFormActionDefinition<Template> {}
