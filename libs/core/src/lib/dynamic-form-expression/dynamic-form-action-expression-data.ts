import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

export interface DynamicFormActionExpressionData {
  readonly parent: DynamicFormFieldExpressionData;
  readonly root: DynamicFormFieldExpressionData;
}
