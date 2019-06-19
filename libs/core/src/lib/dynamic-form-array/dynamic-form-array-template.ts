import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';

export interface DynamicFormArrayTemplate extends DynamicFormFieldTemplate {
  [additionalProperties: string]: any;
}
