import { DynamicFormActionDefinition } from '../dynamic-form-action/dynamic-form-action-definition';
import { DynamicFormElementDefinition } from '../dynamic-form-element/dynamic-form-element-definition';
import { DynamicFormFieldEvaluatorDefinition } from './dynamic-form-field-evaluator-definition';
import { DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression-func';
import { DynamicFormFieldSettings } from './dynamic-form-field-settings';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldValidatorDefinition } from './dynamic-form-field-validator-definition';

export interface DynamicFormFieldDefinition<Value = any, Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate>
  extends DynamicFormElementDefinition<Template> {
  key?: string;
  index?: number;
  defaultValue?: Value;
  settings?: DynamicFormFieldSettings;
  unregistered?: boolean;
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunc };
  validators?: { [key: string]: DynamicFormFieldValidatorDefinition };
  evaluators?: { [key: string]: DynamicFormFieldEvaluatorDefinition };
  headerActions?: DynamicFormActionDefinition[];
  footerActions?: DynamicFormActionDefinition[];
  wrappers?: string[];
}
