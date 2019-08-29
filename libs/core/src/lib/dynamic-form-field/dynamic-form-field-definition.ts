import { DynamicFormFieldExpressionFunction} from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldEvaluatorFunction } from './dynamic-form-field-evaluator';
import { DynamicFormFieldOptions } from './dynamic-form-field-options';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldDefinition<Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate> {
  key: string;
  type: DynamicFormFieldType;
  template: Template;
  evaluations?: { key?: string, func?: DynamicFormFieldEvaluatorFunction }[];
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunction };
  wrappers?: DynamicFormWrapperType[];
  options?: DynamicFormFieldOptions;
}
