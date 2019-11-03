import { DynamicFormFieldExpressionFunction} from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormFieldEvaluatorFunction } from './dynamic-form-field-evaluator';
import { DynamicFormFieldOptions } from './dynamic-form-field-options';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

export interface DynamicFormFieldDefinition<Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate> {
  key: string;
  type: string;
  template: Template;
  options?: DynamicFormFieldOptions;
  evaluations?: { key?: string, func?: DynamicFormFieldEvaluatorFunction }[];
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunction };
  wrappers?: string[];
}
