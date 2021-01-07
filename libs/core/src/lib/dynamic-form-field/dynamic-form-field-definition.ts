import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldExpressionFunc } from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormFieldEvaluatorFn } from './dynamic-form-field-evaluator';
import { DynamicFormFieldSettings } from './dynamic-form-field-settings';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export interface DynamicFormFieldDefinition<
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate
> extends DynamicFormElementDefinition<Template> {
  key?: string;
  index?: number;
  settings?: DynamicFormFieldSettings;
  unregistered?: boolean;
  evaluations?: { key?: string, func?: DynamicFormFieldEvaluatorFn }[];
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunc };
  validators?: { [key: string]: DynamicFormFieldValidatorDefinition };
  headerActions?: DynamicFormActionDefinition[];
  footerActions?: DynamicFormActionDefinition[];
  wrappers?: string[];
}
