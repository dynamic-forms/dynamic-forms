import { DynamicFormExpressions } from '../dynamic-form-expression/dynamic-form-expressions';
import { DynamicFormActionExpression } from './dynamic-form-action-expression';
import { DynamicFormActionExpressionData } from './dynamic-form-action-expression-data';
import { DynamicFormActionExpressionFunc } from './dynamic-form-action-expression-func';

export interface DynamicFormActionExpressions<
  Data extends DynamicFormActionExpressionData = DynamicFormActionExpressionData,
  Func extends DynamicFormActionExpressionFunc<Data> = DynamicFormActionExpressionFunc<Data>,
> extends DynamicFormExpressions<DynamicFormActionExpression<Data, Func>> {}
