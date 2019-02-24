import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { ExamplesResolver } from './examples.resolver';

@NgModule({
  imports: [
    HttpClientModule,
    ExamplesRoutingModule
  ],
  declarations: [
    ExamplesComponent
  ],
  providers: [
    ExamplesResolver
  ]
})
export class ExamplesModule {}
