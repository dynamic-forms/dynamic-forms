import { DynamicFormElementExpressionFunc } from '../dynamic-form-element/dynamic-form-element-expression-func';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';

export type DynamicFormActionExpressionFunc<Data extends DynamicFormActionExpressionData = DynamicFormActionExpressionData> =
  DynamicFormElementExpressionFunc<Data>;
