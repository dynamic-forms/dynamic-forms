import { NgModule } from '@angular/core';
import { DynamicFormConfigModule, dynamicFormLibrary, DynamicFormElementType } from '@dynamic-forms/core';
import { DynamicFormMarkdownComponent } from './dynamic-form-markdown.component';
import { DynamicFormMarkdownService } from './dynamic-form-markdown.service';

export const dynamicFormMarkdownType: DynamicFormElementType = {
  type: 'markdown',
  component: DynamicFormMarkdownComponent,
  libraryName: dynamicFormLibrary.name,
};

@NgModule({
  imports: [
    DynamicFormConfigModule.withElement(dynamicFormMarkdownType),
  ],
  exports: [
    DynamicFormConfigModule,
  ],
  providers: [
    DynamicFormMarkdownService,
  ],
})
export class DynamicFormMarkdownModule {}
