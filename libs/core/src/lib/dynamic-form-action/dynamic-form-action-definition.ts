import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormActionExpressionFunction } from '../dynamic-form-expression/dynamic-form-action-expression';
import { DynamicFormActionTemplate } from './dynamic-form-action-template';

export interface DynamicFormActionDefinition<
  Template extends DynamicFormActionTemplate = DynamicFormActionTemplate
> extends DynamicFormElementDefinition<Template> {
  expressions?: { [key: string]: string | DynamicFormActionExpressionFunction };
}
