import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormItemTemplate extends DynamicFormElementTemplate {
  label: string;
  index?: number;
  disabled?: boolean;
}
