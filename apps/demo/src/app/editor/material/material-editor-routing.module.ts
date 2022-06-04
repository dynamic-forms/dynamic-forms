import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialEditorComponent } from './material-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MaterialEditorComponent,
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class MaterialEditorRoutingModule {}
