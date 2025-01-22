import { DynamicFormExpression } from './dynamic-form-expression';

export type DynamicFormExpressions<Expression extends DynamicFormExpression = DynamicFormExpression> = Record<string, Expression>;
