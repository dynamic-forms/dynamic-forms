import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpression, DynamicFormExpressionDependency,
  DynamicFormExpressionFunction, DynamicFormExpressionMemoization } from './dynamic-form-expression';

export const dynamicFormFieldExpressionDependencyArgs = [
  { name: 'model', pattern: /model+[.\w]+/g },
  { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
  { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
];

export const dynamicFormFieldExpressionArgs = [ 'model', 'parentModel', 'rootModel', 'memo' ];

export class DynamicFormFieldExpression implements DynamicFormExpression {
  protected _memo: DynamicFormExpressionMemoization;

  constructor(
    readonly deps: DynamicFormExpressionDependency[],
    readonly func: DynamicFormExpressionFunction,
    readonly field: DynamicFormField
  ) {
    this._memo = { previousValue: null, currentValue: null };
  }

  get value() {
    this._memo.previousValue = this._memo.currentValue;
    this._memo.currentValue = this.func(this.model, this.parentModel, this.rootModel, this._memo);
    return this._memo.currentValue;
  }

  private get model() { return this.field.model; }
  private get parentModel() { return this.field.parent.model; }
  private get rootModel() { return this.field.root.model; }
}
