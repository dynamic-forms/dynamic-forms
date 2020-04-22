import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormArrayValidation } from './dynamic-form-array-validation';

export interface DynamicFormArrayTemplate extends DynamicFormFieldTemplate<DynamicFormArrayValidation> {
  labelHidden?: boolean;
  classNameLabel?: string;
  classNameElements?: string;
  classNameActions?: string;
  minLength?: number;
  maxLength?: number;
}
