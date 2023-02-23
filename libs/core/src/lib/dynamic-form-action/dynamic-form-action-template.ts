import { DynamicFormElementTemplate } from '../dynamic-form-element/dynamic-form-element-template';

export type DynamicFormActionPureFunc = () => void;

export interface DynamicFormActionTemplate extends DynamicFormElementTemplate {
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  action: string | DynamicFormActionPureFunc;
  dialogTitle?: string;
  dialogTitleHtml?: string;
  dialogWidth?: string;
  dialogMinWidth?: string;
  dialogMaxWidth?: string;
  classNameWrapper?: string;
  classNameDialogTitle?: string;
}
