import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormExpression } from '../dynamic-form-expression/dynamic-form-expression';
import { DynamicFormErrorHandler } from '../dynamic-form-error/dynamic-form-error.handler';
import { DynamicFormError, DynamicFormErrorType } from '../dynamic-form-error/dynamic-form-error';
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
    protected errorHandler: DynamicFormErrorHandler,
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
        const type = DynamicFormErrorType.ExpressionEvaluation;
        const message = 'Expression evaluation';
        this.errorHandler.handle(new DynamicFormError(type, message, error));
      }
      this._errorMessage = error.message;
      return undefined;
    }
  }
}
