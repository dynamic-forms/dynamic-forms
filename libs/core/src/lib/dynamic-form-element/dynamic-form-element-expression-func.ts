import { DynamicFormExpressionFunc } from '../dynamic-form-expression/dynamic-form-expression-func';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';

export type DynamicFormElementExpressionFunc<Data extends DynamicFormElementExpressionData = DynamicFormElementExpressionData> =
  DynamicFormExpressionFunc<Data>;
