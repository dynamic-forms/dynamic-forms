import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormEvaluator } from './dynamic-form-evaluator';

export type DynamicFormFieldEvaluatorFunction<Field extends DynamicFormField =
  DynamicFormField> = (field: Field) => void;

export interface DynamicFormFieldEvaluator<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormEvaluator<DynamicFormFieldEvaluatorFunction<Field>> {}
