import { DynamicFormElementExpressionFunc } from '../dynamic-form-element/dynamic-form-element-expression-func';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';

export type DynamicFormFieldExpressionFunc<Data extends DynamicFormFieldExpressionData = DynamicFormFieldExpressionData> =
  DynamicFormElementExpressionFunc<Data>;
