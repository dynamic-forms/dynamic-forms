import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MarkdownComponent } from '../markdown/markdown.component';
import { FormDefinitionLoader } from './form-definition.loader';
import { FormExampleDefinitionResolver } from './form-example-definition.resolver';
import { FormExampleComponent } from './form-example.component';
import { FormExampleResolver } from './form-example.resolver';
import { FormModelResolver } from './form-model.resolver';

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
    FormDefinitionLoader,
    FormExampleResolver,
    FormExampleDefinitionResolver,
    FormModelResolver,
  ],
})
export class FormExampleModule {}
