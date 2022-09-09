import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormExpression } from '../dynamic-form-expression/dynamic-form-expression';
import { DynamicFormLogType } from '../dynamic-form-logging/dynamic-form-log-type';
import { DynamicFormLogger } from '../dynamic-form-logging/dynamic-form.logger';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression-func';

export class DynamicFormElementExpression<
  Data extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Func extends DynamicFormElementExpressionFunc<Data> = DynamicFormElementExpressionFunc<Data>
> implements DynamicFormExpression<Data, Func> {
  private _errorMessage: string;

  constructor(
    readonly key: string,
    readonly element: DynamicFormElement,
    readonly func: Func,
    protected logger: DynamicFormLogger,
  ) {}

  get value(): any { return this.tryEvaluate(); }

  protected evaluate(): any {
    return this.func(this.element.expressionData as Data);
  }

  protected tryEvaluate(): any {
    try {
      const value = this.evaluate();
      this._errorMessage = undefined;
      return value;
    } catch (error) {
      if (this._errorMessage !== error.message) {
        this.logger.error(DynamicFormLogType.Expression, 'Expression evaluation', error);
      }
      this._errorMessage = error.message;
      return undefined;
    }
  }
}
