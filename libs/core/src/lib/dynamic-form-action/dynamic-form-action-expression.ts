import { DynamicFormElementExpression } from '../dynamic-form-element/dynamic-form-element-expression';
import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormAction } from './dynamic-form-action';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression-func';

export class DynamicFormActionExpression<
  Data extends DynamicFormActionExpressionData = DynamicFormActionExpressionData,
  Func extends DynamicFormActionExpressionFunc<Data> = DynamicFormActionExpressionFunc<Data>
> extends DynamicFormElementExpression {

  constructor(
    override readonly key: string,
    readonly action: DynamicFormAction,
    override readonly func: Func,
    protected override logger: DynamicFormLogger,
  ) {
    super(key, action, func, logger);
  }

  protected override evaluate(): any {
    return this.func(this.action.expressionData as Data);
  }
}
