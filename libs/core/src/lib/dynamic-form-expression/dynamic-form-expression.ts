import { DynamicFormExpressionData } from './dynamic-form-expression-data';
import { DynamicFormExpressionFunc } from './dynamic-form-expression-func';

export interface DynamicFormExpression<
  Data extends DynamicFormExpressionData = DynamicFormExpressionData,
  Func extends DynamicFormExpressionFunc<Data> = DynamicFormExpressionFunc<Data>
> {
  readonly key: string;
  readonly value: any;
  readonly func: Func;
}

export const dynamicFormExpressionArgs = [ 'data', 'memo' ];
