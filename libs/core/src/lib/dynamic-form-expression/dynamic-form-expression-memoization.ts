import { DynamicFormExpressionState } from './dynamic-form-expression-state';

export interface DynamicFormExpressionMemoization extends DynamicFormExpressionState {
  [ memoizationKey: string ]: any;
}
