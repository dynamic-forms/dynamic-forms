import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormDictionaryValidation } from './dynamic-form-dictionary-validation';

export interface DynamicFormDictionaryTemplate extends DynamicFormFieldTemplate<DynamicFormDictionaryValidation> {
  labelHidden?: boolean;
  minLength?: number;
  maxLength?: number;
  classNameLabel?: string;
  classNameHeader?: string;
  classNameElements?: string;
  classNameFooter?: string;
}
