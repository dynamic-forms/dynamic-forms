import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormExpression } from './dynamic-form-expression';

export const dynamicFormActionExpressionArgs = [ 'data' ];

export type DynamicFormActionExpressionFunction = (data: DynamicFormActionExpressionData) => any;

export class DynamicFormActionExpression implements DynamicFormExpression<DynamicFormActionExpressionFunction> {
  constructor(
    readonly key: string,
    readonly action: DynamicFormAction,
    readonly func: DynamicFormActionExpressionFunction
  ) {}

  get value() { return this.func(this.action.expressionData); }
}
