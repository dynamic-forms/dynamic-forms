import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicFormMarkdownComponent, DynamicFormMarkdownModule } from '@dynamic-forms/markdown';
import { MarkdownComponent } from './markdown.component';


@NgModule({
  imports: [
    CommonModule,
    DynamicFormMarkdownComponent,
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
