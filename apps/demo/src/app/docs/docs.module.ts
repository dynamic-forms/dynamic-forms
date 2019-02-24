import { NgModule } from '@angular/core';
import { DocsBootstrapModule } from './bootstrap/docs-bootstrap.module';
import { DocsCoreModule } from './core/docs-core.module';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { DocsMaterialModule } from './material/docs-material.module';

@NgModule({
  declarations: [
    DocsComponent
  ],
  imports: [
    DocsRoutingModule,
    DocsCoreModule,
    DocsBootstrapModule,
    DocsMaterialModule
  ]
})
export class DocsModule {}
