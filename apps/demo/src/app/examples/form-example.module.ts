import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownComponent } from '../markdown/markdown.component';
import { FormExampleLoader } from './form-example.loader';
import { FormExampleComponent } from './form-example.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MarkdownComponent,
  ],
  declarations: [
    FormExampleComponent,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    FormExampleComponent,
  ],
  providers: [
    FormExampleLoader,
  ],
})
export class FormExampleModule {}
