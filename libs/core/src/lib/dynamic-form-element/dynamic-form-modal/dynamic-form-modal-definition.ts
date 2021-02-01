import { DynamicFormActionDefinition } from '../../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElementDefinition } from '../dynamic-form-element-definition';
import { DynamicFormModalTemplate } from './dynamic-form-modal-template';

export interface DynamicFormModalDefinition<
  Template extends DynamicFormModalTemplate = DynamicFormModalTemplate
> extends DynamicFormElementDefinition<Template> {
  trigger: DynamicFormActionDefinition;
  children: DynamicFormElementDefinition[];
  headerActions?: DynamicFormActionDefinition[];
  footerActions?: DynamicFormActionDefinition[];
}
