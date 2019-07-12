export interface DynamicFormExpression<Func = Function> {
  readonly key: string;
  readonly value: any;
  readonly func: Func;
}
