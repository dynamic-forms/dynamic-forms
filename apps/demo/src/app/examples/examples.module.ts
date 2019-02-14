import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BootstrapExamplesModule } from './bootstrap/bootstrap-examples.module';
import { ExampleResolver } from './example.resolver';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { MaterialExamplesModule } from './material/material-examples.module';

@NgModule({
  imports: [
    HttpClientModule,
    ExamplesRoutingModule,
    BootstrapExamplesModule,
    // MaterialExamplesModule
  ],
  declarations: [
    ExamplesComponent
  ],
  providers: [
    ExampleResolver
  ]
})
export class ExamplesModule {}
