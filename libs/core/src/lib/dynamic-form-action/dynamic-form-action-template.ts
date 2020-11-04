import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';

export interface DynamicFormActionTemplate extends DynamicFormElementTemplate {
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  action: string;
  dialogTitle?: string;
  dialogTitleHtml?: string;
  dialogWidth?: string;
  dialogMinWidth?: string;
  dialogMaxWidth?: string;
  classNameDialogTitle?: string;
}
