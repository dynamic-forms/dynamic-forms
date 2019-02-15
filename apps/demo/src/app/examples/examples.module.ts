import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExampleResolver } from './example.resolver';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';

@NgModule({
  imports: [
    HttpClientModule,
    ExamplesRoutingModule
  ],
  declarations: [
    ExamplesComponent
  ],
  providers: [
    ExampleResolver
  ]
})
export class ExamplesModule {}
