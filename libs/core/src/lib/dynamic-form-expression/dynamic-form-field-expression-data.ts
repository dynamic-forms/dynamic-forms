import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

export interface DynamicFormFieldExpressionData extends DynamicFormElementExpressionData {
  readonly id: string;
  readonly key: string;
  readonly index: number;
  readonly depth: number;
  readonly model: any;
  readonly value: any;
  readonly status: string;
  readonly [key: string]: any;
  readonly root: DynamicFormFieldExpressionData;
  readonly parent: DynamicFormFieldExpressionData;
}
