import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElementExpressionFunc } from '../dynamic-form-expression/dynamic-form-element-expression';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export interface DynamicFormElementDefinition<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate
> {
  type?: string;
  template?: Template;
  elements?: DynamicFormElementDefinition[];
  actions?: DynamicFormActionDefinition[];
  expressions?: { [key: string]: string | DynamicFormElementExpressionFunc };
}
