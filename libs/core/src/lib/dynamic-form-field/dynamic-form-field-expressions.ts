import { DynamicFormField } from './dynamic-form-field';
import { Expression } from './expression';

export interface DynamicFormFieldExpression extends Expression {
  field: DynamicFormField;
}

export interface DynamicFormFieldExpressions {
  [key: string]: DynamicFormFieldExpression;
}
