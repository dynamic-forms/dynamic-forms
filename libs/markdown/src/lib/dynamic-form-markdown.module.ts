import { NgModule, Provider } from '@angular/core';
import {
  DynamicFormConfigModule,
  DynamicFormElementType,
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

export function provideDynamicFormsMarkdown(): Provider[] {
  return [DynamicFormMarkdownService, ...importDynamicFormsProviders(withDynamicFormElements(dynamicFormMarkdownType))];
}

const modules = [DynamicFormConfigModule];

/**
 * @deprecated Use {@link provideDynamicFormsMarkdown} instead.
 */
@NgModule({
  imports: modules,
  exports: modules,
  providers: provideDynamicFormsMarkdown(),
})
export class DynamicFormMarkdownModule {}
