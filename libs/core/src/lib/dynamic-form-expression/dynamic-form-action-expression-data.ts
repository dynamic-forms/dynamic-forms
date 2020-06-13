import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

export interface DynamicFormActionExpressionData extends DynamicFormElementExpressionData {
  readonly root: DynamicFormFieldExpressionData;
  readonly parent: DynamicFormElementExpressionData | DynamicFormFieldExpressionData;
}
