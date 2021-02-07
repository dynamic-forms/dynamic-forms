import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormGroupValidation } from './dynamic-form-group-validation';

export interface DynamicFormGroupTemplate extends DynamicFormFieldTemplate<DynamicFormGroupValidation> {
  labelHidden?: boolean;
  classNameLabel?: string;
  classNameHeader?: string;
  classNameChildren?: string;
  classNameFooter?: string;
}
