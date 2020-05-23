import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormExpression, DynamicFormExpressionFunc } from './dynamic-form-expression';

export type DynamicFormActionExpressionFunc = DynamicFormExpressionFunc<DynamicFormActionExpressionData>;

export class DynamicFormActionExpression implements DynamicFormExpression<DynamicFormActionExpressionData> {
  constructor(
    readonly key: string,
    readonly action: DynamicFormAction,
    readonly func: DynamicFormActionExpressionFunc
  ) {}

  get value(): any { return this.func(this.action.expressionData); }
}
