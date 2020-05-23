import { DynamicFormExpression } from './dynamic-form-expression';
import { DynamicFormExpressionData } from './dynamic-form-expression-data';

export interface DynamicFormExpressions<
  Data extends DynamicFormExpressionData = DynamicFormExpressionData,
  Expression extends DynamicFormExpression<Data> = DynamicFormExpression<Data>
> {
  [key: string]: Expression;
}
