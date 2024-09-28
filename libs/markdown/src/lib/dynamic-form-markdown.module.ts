import { Provider } from '@angular/core';
import {
  DynamicFormElementType,
  DynamicFormsFeature,
  dynamicFormLibrary,
  importDynamicFormsProviders,
  withDynamicFormElements,
} from '@dynamic-forms/core';
import { DynamicFormMarkdownComponent } from './dynamic-form-markdown.component';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

export const dynamicFormMarkdownType: DynamicFormElementType = {
  type: 'markdown',
  component: DynamicFormMarkdownComponent,
  libraryName: dynamicFormLibrary.name,
};

export function withDynamicFormsMarkdownFeatures(): DynamicFormsFeature[] {
  const providers = [DynamicFormMarkdownService];
  return [{ providers }, withDynamicFormElements(dynamicFormMarkdownType)];
}

export function provideDynamicFormsMarkdown(): Provider[] {
  return importDynamicFormsProviders(...withDynamicFormsMarkdownFeatures());
}
