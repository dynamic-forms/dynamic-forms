import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormArrayValidation } from './dynamic-form-array-validation';

export interface DynamicFormArrayTemplate extends DynamicFormFieldTemplate<DynamicFormArrayValidation> {
  labelHidden?: boolean;
  minLength?: number;
  maxLength?: number;
  classNameLabel?: string;
  classNameHeader?: string;
  classNameChildren?: string;
  classNameFooter?: string;
}
