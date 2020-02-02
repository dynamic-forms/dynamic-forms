import { DynamicFormActionTemplate } from '../dynamic-form-action-template';

export interface DynamicFormButtonTemplate extends DynamicFormActionTemplate {
  type?: 'button' | 'submit' | 'reset';
}
