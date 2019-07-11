import { DynamicFormFieldEvaluation } from '../dynamic-form-evaluation/dynamic-form-field-evaluation';
import { DynamicFormFieldExpressionFunction} from '../dynamic-form-expression/dynamic-form-field-expression';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';
import { DynamicFormFieldType } from './dynamic-form-field-type';

export interface DynamicFormFieldDefinition<Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate> {
  key: string;
  type: DynamicFormFieldType;
  template: Template;
  evaluation?: DynamicFormFieldEvaluation;
  expressions?: { [key: string]: string | DynamicFormFieldExpressionFunction };
  wrappers?: DynamicFormWrapperType[];
}
