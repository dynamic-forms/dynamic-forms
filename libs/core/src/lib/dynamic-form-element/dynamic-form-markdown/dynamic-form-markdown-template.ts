import { DynamicFormElementTemplate } from '../dynamic-form-element-template';

export interface DynamicFormMarkdownTemplate extends DynamicFormElementTemplate {
  source?: string;
  markdown?: string;
}
