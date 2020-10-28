import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormDictionaryValidation } from './dynamic-form-dictionary-validation';

export interface DynamicFormDictionaryTemplate extends DynamicFormFieldTemplate<DynamicFormDictionaryValidation> {
  labelHidden?: boolean;
  classNameLabel?: string;
  classNameElements?: string;
  classNameActions?: string;
  minLength?: number;
  maxLength?: number;
}
