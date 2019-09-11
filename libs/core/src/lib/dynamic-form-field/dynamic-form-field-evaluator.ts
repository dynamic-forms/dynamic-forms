import { DynamicFormEvaluator } from '../dynamic-form-evaluation/dynamic-form-evaluator';
import { DynamicFormField } from './dynamic-form-field';

export type DynamicFormFieldEvaluatorFunction<Field extends DynamicFormField =
  DynamicFormField> = (field: Field) => void;

export interface DynamicFormFieldEvaluator<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormEvaluator<DynamicFormFieldEvaluatorFunction<Field>> {}
