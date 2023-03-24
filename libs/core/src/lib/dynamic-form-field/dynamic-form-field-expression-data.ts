import { DynamicFormElementExpressionData } from '../dynamic-form-element/dynamic-form-element-expression-data';

export interface DynamicFormFieldExpressionData extends DynamicFormElementExpressionData {
  readonly key: string;
  readonly index: number;
  readonly depth: number;
  readonly disabled: boolean;
  readonly readonly: boolean;
  readonly model: any;
  readonly value: any;
  readonly valid: any;
  readonly status: string;
  readonly [key: string]: any;
}
