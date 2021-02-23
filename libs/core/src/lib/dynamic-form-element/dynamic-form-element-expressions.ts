import { DynamicFormExpressions } from '../dynamic-form-expression/dynamic-form-expressions';
import { DynamicFormElementExpression} from './dynamic-form-element-expression';
import { DynamicFormElementExpressionData } from './dynamic-form-element-expression-data';
import { DynamicFormElementExpressionFunc } from './dynamic-form-element-expression-func';

export interface DynamicFormElementExpressions<
  Data extends DynamicFormElementExpressionData = DynamicFormElementExpressionData,
  Func extends DynamicFormElementExpressionFunc<Data> = DynamicFormElementExpressionFunc<Data>
> extends DynamicFormExpressions<DynamicFormElementExpression<Data, Func>> {}
