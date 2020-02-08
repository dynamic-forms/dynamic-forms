import { DynamicFormAction } from '../dynamic-form-action/dynamic-form-action';
import { DynamicFormExpression } from './dynamic-form-expression';

export const dynamicFormActionExpressionArgs = [ 'parentStatus', 'rootStatus' ];

export type DynamicFormActionExpressionFunction = (rootStatus: string, parentStatus: string) => any;

export class DynamicFormActionExpression implements DynamicFormExpression<DynamicFormActionExpressionFunction> {
  constructor(
    readonly key: string,
    readonly action: DynamicFormAction,
    readonly func: DynamicFormActionExpressionFunction
  ) {}

  get value() { return this.func(this.parentStatus, this.rootStatus); }

  private get parentStatus() { return this.action.parent.status; }
  private get rootStatus() { return this.action.root.status; }
}
