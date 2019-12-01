import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';

export interface DynamicFormGroupTemplate extends DynamicFormFieldTemplate {
  className?: string;
  [additionalProperties: string]: any;
}
