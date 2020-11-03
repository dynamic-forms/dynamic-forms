import { DynamicFormActionTemplate } from '../dynamic-form-action-template';

export interface DynamicFormDialogTemplate extends DynamicFormActionTemplate {
  title?: string;
  titleClassName?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}
