import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';

export interface DynamicFormElementExpressionData {
  readonly root?: DynamicFormFieldExpressionData;
  readonly parent?: DynamicFormElementExpressionData;
  readonly parentField?: DynamicFormFieldExpressionData;
  readonly id: string;
  readonly hidden: boolean;
  readonly [key: string]: any;
}
