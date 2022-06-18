import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { MarkdownComponent } from './markdown.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormMarkdownModule,
  ],
  declarations: [
    MarkdownComponent,
  ],
  exports: [
    MarkdownComponent,
  ],
})
export class MarkdownModule {}
