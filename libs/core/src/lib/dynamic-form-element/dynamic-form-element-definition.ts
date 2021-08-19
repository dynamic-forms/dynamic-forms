import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression-func';
import { DynamicFormElementTemplate } from './dynamic-form-element-template';

export type DynamicFormElementChildren = DynamicFormElementDefinition[] | { [key: string]: DynamicFormElementDefinition };

export interface DynamicFormElementDefinition<
  Template extends DynamicFormElementTemplate = DynamicFormElementTemplate
> {
  id?: string;
  type?: string;
  reference?: string;
  template?: Template;
  expressions?: { [key: string]: string | DynamicFormElementExpressionFunc };
  children?: DynamicFormElementChildren;
}
