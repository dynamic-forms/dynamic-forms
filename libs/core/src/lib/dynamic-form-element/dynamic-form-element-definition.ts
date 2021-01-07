import { DynamicFormElementExpressionFunc } from '../dynamic-form-expression/dynamic-form-element-expression';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export interface DynamicFormElementDefinition<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate
> {
  id?: string;
  type?: string;
  template?: Template;
  elements?: DynamicFormElementDefinition[];
  expressions?: { [key: string]: string | DynamicFormElementExpressionFunc };
  reference?: string;
}
