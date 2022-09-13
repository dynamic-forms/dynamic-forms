import { DynamicFormElementExpression } from '../dynamic-form-element/dynamic-form-element-expression';
import { DynamicFormExpressionMemoization } from '../dynamic-form-expression/dynamic-form-expression-memoization';
import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression-func';

export class DynamicFormFieldExpression<
  Data extends DynamicFormFieldExpressionData = DynamicFormFieldExpressionData,
  Func extends DynamicFormFieldExpressionFunc<Data> = DynamicFormFieldExpressionFunc<Data>
> extends DynamicFormElementExpression<Data, Func> {

  protected _memo: DynamicFormExpressionMemoization;

  constructor(
    override readonly key: string,
    readonly field: DynamicFormField,
    override readonly func: Func,
    protected override logger: DynamicFormLogger,
  ) {
    super(key, field, func, logger);
    this._memo = { previousValue: undefined, currentValue: undefined };
  }

  override get value(): any {
    this.previousValue = this.currentValue;
    this.currentValue = this.tryEvaluate();
    if (this.previousValue !== this.currentValue) {
      this.field.expressionChangesSubject.next({
        key: this.key,
        previousValue: this.previousValue,
        currentValue: this.currentValue,
      });
    }
    return this.currentValue;
  }

  protected override evaluate(): any {
    return this.func(this.field.expressionData as Data, this._memo);
  }

  private get previousValue(): any { return this._memo.previousValue; }
  private set previousValue(value: any) { this._memo.previousValue = value; }

  private get currentValue(): any { return this._memo.currentValue; }
  private set currentValue(value: any) { this._memo.currentValue = value; }
}
