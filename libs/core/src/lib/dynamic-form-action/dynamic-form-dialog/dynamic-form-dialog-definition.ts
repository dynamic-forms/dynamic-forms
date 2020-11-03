import { DynamicFormDefinition } from '../../dynamic-form/dynamic-form-definition';
import { DynamicFormActionDefinition } from '../dynamic-form-action-definition';
import { DynamicFormDialogTemplate } from './dynamic-form-dialog-template';

export interface DynamicFormDialogDefinition<
  Template extends DynamicFormDialogTemplate = DynamicFormDialogTemplate
> extends DynamicFormActionDefinition<Template> {
  dialogDefinition: DynamicFormDefinition;
}
