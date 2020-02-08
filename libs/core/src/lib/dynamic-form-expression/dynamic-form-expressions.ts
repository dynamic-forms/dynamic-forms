import { DynamicFormExpression } from './dynamic-form-expression';

export interface DynamicFormFormExpressions<Func = Function> {
  [key: string]: DynamicFormExpression<Func>;
}
