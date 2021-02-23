import { DynamicFormExpressionData } from './dynamic-form-expression-data';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';

export type DynamicFormExpressionFunc<Data extends DynamicFormExpressionData = DynamicFormExpressionData> =
  (data: Data, memo?: DynamicFormExpressionMemoization) => any;
