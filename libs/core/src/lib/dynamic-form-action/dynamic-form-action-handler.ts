import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormAction } from './dynamic-form-action';

export type DynamicFormActionHandler<Field extends DynamicFormField = DynamicFormField> =
  (field: Field, action: DynamicFormAction) => void;
