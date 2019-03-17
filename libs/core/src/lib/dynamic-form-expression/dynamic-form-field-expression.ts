import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpression } from './dynamic-form-expression';

export interface DynamicFormFieldExpression extends DynamicFormExpression {
  field: DynamicFormField;
}
