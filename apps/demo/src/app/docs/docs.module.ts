import { NgModule } from '@angular/core';
import { BootstrapDocsModule } from './bootstrap/bootstrap-docs.module';
import { CoreDocsModule } from './core/core-docs.module';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { MaterialDocsModule } from './material/material-docs.module';

@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    DocsRoutingModule,
    CoreDocsModule,
    BootstrapDocsModule,
    MaterialDocsModule
  ]
})
export class DocsModule {}
