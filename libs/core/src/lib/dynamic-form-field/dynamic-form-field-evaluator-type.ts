import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';
import { DynamicFormField } from './dynamic-form-field';

export type DynamicFormFieldEvaluatorFn<
  Field extends DynamicFormField = DynamicFormField
> = (field: Field) => void;

export interface DynamicFormFieldEvaluatorType<Field extends DynamicFormField = DynamicFormField> {
  type: string;
  func: DynamicFormFieldEvaluatorFn<Field>;
  libraryName: DynamicFormLibraryName;
}
