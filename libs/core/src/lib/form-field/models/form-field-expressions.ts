import { FormField } from './form-field';

export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface Expression {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: any;
}

export interface FormFieldExpression extends Expression {
  field: FormField;
}

export interface FormFieldExpressions {
  [key: string]: FormFieldExpression;
}
