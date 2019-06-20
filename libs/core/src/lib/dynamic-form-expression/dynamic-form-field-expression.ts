import { DynamicFormField } from './../dynamic-form-field/dynamic-form-field';
import { DynamicFormExpression, DynamicFormExpressionState } from './dynamic-form-expression';
import { DynamicFormExpressionDependency } from './dynamic-form-expression';
import { DynamicFormExpressionFunction } from './dynamic-form-expression';

export class DynamicFormFieldExpression implements DynamicFormExpression {
  static readonly dependencyArgs = [
    { name: 'model', pattern: /model+[.\w]+/g },
    { name: 'parentModel', pattern: /parentModel+[.\w]+/g },
    { name: 'rootModel', pattern: /rootModel+[.\w]+/g }
  ];
  static readonly args = DynamicFormFieldExpression.dependencyArgs.map(arg => arg.name).concat([ 'state' ]);

  private _state: DynamicFormExpressionState;

  constructor(
    readonly deps: DynamicFormExpressionDependency[],
    readonly func: DynamicFormExpressionFunction,
    readonly field: DynamicFormField
  ) {
    this._state = {};
  }

  get value() {
    this._state.previousValue = this._state.currentValue;
    this._state.currentValue = this.func(this.field.model, this.field.parent.model, this.field.root.model, this._state);
    return this._state.currentValue;
  }
}
