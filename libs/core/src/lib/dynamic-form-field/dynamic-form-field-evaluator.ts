import { DynamicFormEvaluator } from '../dynamic-form-evaluation/dynamic-form-evaluator';
import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormField } from './dynamic-form-field';

export type DynamicFormFieldEvaluatorFn<Field extends DynamicFormField =
  DynamicFormField> = (field: Field) => void;

export interface DynamicFormFieldEvaluator<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormEvaluator<DynamicFormFieldEvaluatorFn<Field>> {}

export interface DynamicFormFieldEvaluatorType<Field extends DynamicFormField = DynamicFormField> extends DynamicFormFieldEvaluator<Field> {
  type: string;
  libraryName: DynamicFormLibraryName;
}
