export type DynamicFormExpressionFunction = Function;
export type DynamicFormExpressionDependency = string;

export interface DynamicFormExpression {
  readonly deps: DynamicFormExpressionDependency[];
  readonly func: DynamicFormExpressionFunction;
  readonly value: any;
}

export interface DynamicFormExpressionMemoization {
  previousValue: any;
  currentValue: any;
  [ memoizationkey: string ]: any;
}
