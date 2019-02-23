import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';

export interface DynamicFormTemplate extends DynamicFormFieldTemplate {
  fields: DynamicFormFieldTemplate[];
}
