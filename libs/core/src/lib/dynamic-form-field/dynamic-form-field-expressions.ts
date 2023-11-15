import { DynamicFormExpressions } from '../dynamic-form-expression/dynamic-form-expressions';
import { DynamicFormFieldExpression } from './dynamic-form-field-expression';
import { DynamicFormFieldExpressionData } from './dynamic-form-field-expression-data';
import { DynamicFormFieldExpressionFunc } from './dynamic-form-field-expression-func';

export interface DynamicFormFieldExpressions<
  Data extends DynamicFormFieldExpressionData = DynamicFormFieldExpressionData,
  Func extends DynamicFormFieldExpressionFunc<Data> = DynamicFormFieldExpressionFunc<Data>,
> extends DynamicFormExpressions<DynamicFormFieldExpression<Data, Func>> {}
