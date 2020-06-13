import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormModalTemplate extends DynamicFormElementTemplate {
  titleHtml?: string;
  title?: string;
  titleClassName?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}
