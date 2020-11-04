import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormModalTemplate extends DynamicFormElementTemplate {
  title?: string;
  titleHtml?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  classNameTitle?: string;
  classNameHeader?: string;
  classNameFooter?: string;
}
