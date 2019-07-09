import { DynamicFormField } from './dynamic-form-field';

export type DynamicFormFieldEvaluator<Field extends DynamicFormField = DynamicFormField> = (field: Field) => void;
