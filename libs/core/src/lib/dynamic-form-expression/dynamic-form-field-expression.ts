import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpression, DynamicFormExpressionMemoization } from './dynamic-form-expression';
import { DynamicFormExpressionDependency } from './dynamic-form-expression';
import { DynamicFormExpressionFunction } from './dynamic-form-expression';

export class DynamicFormFieldExpression implements DynamicFormExpression {
  static readonly dependencyArgs = [
    { name: 'model', pattern: /model+[.\w]+/g },
    { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
    { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
  ];
  static readonly args = DynamicFormFieldExpression.dependencyArgs.map(arg => arg.name).concat([ 'memo' ]);

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
