import { NgModule } from '@angular/core';
import { DynamicFormsModule } from '@dynamic-forms/core';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';

@NgModule({
  declarations: [
    ExamplesComponent
  ],
  imports: [
    ExamplesRoutingModule,
    DynamicFormsModule.forRoot()
  ]
})
export class ExamplesModule {}
