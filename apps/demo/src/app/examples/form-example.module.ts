import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownModule } from '../markdown/markdown.module';
import { FormDefinitionResolver } from './form-definition.resolver';
import { FormExampleComponent } from './form-example.component';
import { FormExampleResolver } from './form-example.resolver';
import { FormModelResolver } from './form-model.resolver';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MarkdownModule,
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
    FormExampleResolver,
    FormDefinitionResolver,
    FormModelResolver,
  ],
})
export class FormExampleModule {}
