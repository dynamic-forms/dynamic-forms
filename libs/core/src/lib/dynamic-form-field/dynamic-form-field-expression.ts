import { DynamicFormElementExpression } from '../dynamic-form-element/dynamic-form-element-expression';
import { DynamicFormExpressionMemoization } from '../dynamic-form-expression/dynamic-form-expression-memoization';
import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression-func';

export class DynamicFormFieldExpression<
  Data extends DynamicFormFieldExpressionData = DynamicFormFieldExpressionData,
  Func extends DynamicFormFieldExpressionFunc<Data> = DynamicFormFieldExpressionFunc<Data>
> extends DynamicFormElementExpression<Data, Func> {

  protected _memo: DynamicFormExpressionMemoization;

  constructor(readonly key: string, readonly field: DynamicFormField, readonly func: Func) {
    super(key, field, func);
    this._memo = { previousValue: null, currentValue: null };
  }

  get value(): any {
    this.previousValue = this.currentValue;
    this.currentValue = this.func(this.field.expressionData as Data, this._memo);
    if (this.previousValue !== this.currentValue) {
      this.field.expressionChangesSubject.next({
        key: this.key,
        previousValue: this.previousValue,
        currentValue: this.currentValue
      });
    }
    return this.currentValue;
  }

  private get previousValue(): any { return this._memo.previousValue; }
  private set previousValue(value: any) { this._memo.previousValue = value; }

  private get currentValue(): any { return this._memo.currentValue; }
  private set currentValue(value: any) { this._memo.currentValue = value; }
}
