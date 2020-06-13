import { DynamicFormExpression } from './dynamic-form-expression';

export interface DynamicFormExpressions<Expression extends DynamicFormExpression = DynamicFormExpression> {
  [key: string]: Expression;
}
