import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormElementExpression, DynamicFormElementExpressionFunc } from './dynamic-form-element-expression';

export type DynamicFormActionExpressionFunc = DynamicFormElementExpressionFunc<DynamicFormActionExpressionData>;

export class DynamicFormActionExpression extends DynamicFormElementExpression {
  constructor(
    readonly key: string,
    readonly action: DynamicFormAction,
    readonly func: DynamicFormActionExpressionFunc
  ) {
    super(key, action, func);
  }

  get value(): any { return this.func(this.action.expressionData); }
}
