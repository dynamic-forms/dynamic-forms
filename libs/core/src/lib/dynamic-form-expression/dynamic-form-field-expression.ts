import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpression, DynamicFormExpressionDependency, DynamicFormExpressionFunction } from './dynamic-form-expression';
import { DynamicFormExpressionMemoization } from './dynamic-form-expression-memoization';

export const dynamicFormFieldExpressionArgs = [ 'model', 'parentModel', 'rootModel', 'memo' ];
export const dynamicFormFieldExpressionDependencyArgs = [
  { name: 'model', pattern: /model+[.\w]+/g },
  { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
  { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
];

export class DynamicFormFieldExpression implements DynamicFormExpression {
  protected _memo: DynamicFormExpressionMemoization;

  constructor(
    readonly key: string,
    readonly field: DynamicFormField,
    readonly func: DynamicFormExpressionFunction,
    readonly deps: DynamicFormExpressionDependency[]
  ) {
    this._memo = { previousValue: null, currentValue: null };
  }

  get value() {
    this.previousValue = this.currentValue;
    this.currentValue = this.func(this.model, this.parentModel, this.rootModel, this._memo);
    if (this.previousValue !== this.currentValue) {
      this.field.expressionChangesSubject.next({
        key: this.key,
        previousValue: this.previousValue,
        currentValue: this.currentValue
      });
    }
    return this.currentValue;
  }

  private get model() { return this.field.model; }
  private get parentModel() { return this.field.parent.model; }
  private get rootModel() { return this.field.root.model; }

  private get previousValue() { return this._memo.previousValue; }
  private get currentValue() { return this._memo.currentValue; }

  private set previousValue(value: any) { this._memo.previousValue = value; }
  private set currentValue(value: any) { this._memo.currentValue = value; }
}
