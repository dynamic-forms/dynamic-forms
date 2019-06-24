export type DynamicFormExpressionFunction = Function;
export type DynamicFormExpressionDependency = string;

export interface DynamicFormExpression {
  readonly key: string;
  readonly value: any;
  readonly func: DynamicFormExpressionFunction;
  readonly deps: DynamicFormExpressionDependency[];
}
