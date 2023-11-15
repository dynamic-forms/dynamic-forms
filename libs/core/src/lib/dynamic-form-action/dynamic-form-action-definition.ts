import { DynamicFormDefinition } from '../dynamic-form/dynamic-form-definition';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression-func';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export interface DynamicFormActionDefinition<Template extends DynamicFormActionTemplate = DynamicFormActionTemplate>
  extends DynamicFormElementDefinition<Template> {
  expressions?: { [key: string]: string | DynamicFormActionExpressionFunc };
  dialogDefinition?: DynamicFormDefinition;
}
