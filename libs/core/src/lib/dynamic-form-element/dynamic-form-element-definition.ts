import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression-func';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export interface DynamicFormElementDefinition<Template extends DynamicFormElementTemplate = DynamicFormElementTemplate> {
  id?: string;
  type?: string;
  reference?: string;
  template?: Template;
  expressions?: Record<string, string | DynamicFormElementExpressionFunc>;
  children?: DynamicFormElementDefinition[];
}
