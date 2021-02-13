import { DynamicFormElementExpressionData } from '../dynamic-form-element/dynamic-form-element-expression-data';
import { DynamicFormFieldExpressionData } from '../dynamic-form-field/dynamic-form-field-expression-data';

export interface DynamicFormActionExpressionData extends DynamicFormElementExpressionData {
  readonly dialog: DynamicFormFieldExpressionData;
  readonly [key: string]: any;
}
