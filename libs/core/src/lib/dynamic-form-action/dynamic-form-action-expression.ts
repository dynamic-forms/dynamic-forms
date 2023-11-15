import { DynamicFormElementExpression } from '../dynamic-form-element/dynamic-form-element-expression';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression-func';

export class DynamicFormActionExpression<
  Data extends DynamicFormActionExpressionData = DynamicFormActionExpressionData,
  Func extends DynamicFormActionExpressionFunc<Data> = DynamicFormActionExpressionFunc<Data>,
> extends DynamicFormElementExpression {
  constructor(
    override readonly key: string,
    readonly action: DynamicFormAction,
    override readonly func: Func,
    protected override errorHandler: DynamicFormErrorHandler,
  ) {
    super(key, action, func, errorHandler);
  }

  protected override evaluate(): any {
    return this.func(this.action.expressionData as Data);
  }
}
