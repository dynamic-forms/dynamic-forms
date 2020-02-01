import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormButtonTemplate extends DynamicFormElementTemplate {
  type?: 'button' | 'submit' | 'reset';
  label: string;
}
