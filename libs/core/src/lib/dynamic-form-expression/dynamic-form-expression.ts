export type DynamicFormExpressionFunction = Function;
export type DynamicFormExpressionDependency = string;

export interface DynamicFormExpression {
  deps: DynamicFormExpressionDependency[];
  func: DynamicFormExpressionFunction;
  value: any;
}
