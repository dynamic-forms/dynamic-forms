import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormModalTemplate extends DynamicFormElementTemplate {
  title?: string;
  titleHtml?: string;
  width?: string;
  height: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  maximized?: boolean;
  classNameTitle?: string;
  classNameChildren?: string;
  classNameHeader?: string;
  classNameFooter?: string;
}
