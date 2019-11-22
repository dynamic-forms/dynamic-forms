import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';

export interface DynamicFormContentTemplate extends DynamicFormElementTemplate {
  content: string;
}
