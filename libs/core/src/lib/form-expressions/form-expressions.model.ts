export type ExpressionFunction = Function;
export type ExpressionDependency = string;

export interface ExpressionValue {
  value: any;
}

export interface Expression {
  deps: ExpressionDependency[];
  func: ExpressionFunction;
  value: ExpressionValue;
}

export interface FormExpressions {
  [key: string]: Expression;
}
