import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BootstrapEditorComponent } from './bootstrap-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BootstrapEditorComponent,
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class BootstrapEditorRoutingModule {}
