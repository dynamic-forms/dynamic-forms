import { NgModule } from '@angular/core';
import { CoreExamplesModule } from './core/core-examples.module';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples.component';
import { MaterialExamplesModule } from './material/material-examples.module';

@NgModule({
  imports: [
    ExamplesRoutingModule,
    CoreExamplesModule,
    MaterialExamplesModule
  ],
  declarations: [
    ExamplesComponent
  ]
})
export class ExamplesModule {}
