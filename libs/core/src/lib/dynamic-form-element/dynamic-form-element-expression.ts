import { DynamicFormElement } from '../dynamic-form-element/dynamic-form-element';
import { DynamicFormExpression } from '../dynamic-form-expression/dynamic-form-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression-func';

export class DynamicFormElementExpression<
  Data extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Func extends DynamicFormElementExpressionFunc<Data> = DynamicFormElementExpressionFunc<Data>
> implements DynamicFormExpression<Data, Func> {

  constructor(readonly key: string, readonly element: DynamicFormElement, readonly func: Func) {}

  get value(): any { return this.func(this.element.expressionData as Data); }
}
