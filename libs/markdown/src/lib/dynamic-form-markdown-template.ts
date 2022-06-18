import { DynamicFormElementTemplate } from '@dynamic-forms/core';

export interface DynamicFormMarkdownTemplate extends DynamicFormElementTemplate {
  source?: string;
  markdown?: string;
}
