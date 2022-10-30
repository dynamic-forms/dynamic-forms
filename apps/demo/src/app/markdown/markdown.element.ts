import { DynamicFormElement } from '@dynamic-forms/core';
import { DynamicFormMarkdownTemplate } from '@dynamic-forms/markdown';

export class MarkdownElement extends DynamicFormElement<DynamicFormMarkdownTemplate> {
  constructor(source: string) {
    super(null, null, null, { template: { source } }, null);
  }

  get source(): string { return this.template.source; }
  set source(value: string) { this.template.source = value; }
}
