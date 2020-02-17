import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';

export interface DynamicFormActionTemplate extends DynamicFormElementTemplate {
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  action?: 'reset' | 'resetDefault' | 'validate';
}
