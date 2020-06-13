import { DynamicFormButtonTemplate } from '../dynamic-form-button/dynamic-form-button-template';

export interface DynamicFormIconTemplate extends DynamicFormButtonTemplate {
  wrapperClassName?: string;
  icon: string;
}
