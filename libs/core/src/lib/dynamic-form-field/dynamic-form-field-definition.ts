import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldExpressionFunc } from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormFieldEvaluatorFn } from './dynamic-form-field-evaluator';
import { DynamicFormFieldOptions } from './dynamic-form-field-options';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export interface DynamicFormFieldDefinition<
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate
> extends DynamicFormElementDefinition<Template> {
  id?: string;
  key?: string;
  index?: number;
  options?: DynamicFormFieldOptions;
  evaluations?: { key?: string, func?: DynamicFormFieldEvaluatorFn }[];
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunc };
  validators?: { [key: string]: DynamicFormFieldValidatorDefinition };
  wrappers?: string[];
  unregistered?: boolean;
}
