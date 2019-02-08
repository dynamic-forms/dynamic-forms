import { Expression } from './expression';
import { FormField } from './form-field';

export interface FormFieldExpression extends Expression {
  field: FormField;
}

export interface FormFieldExpressions {
  [key: string]: FormFieldExpression;
}
