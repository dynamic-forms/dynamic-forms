import { Routes } from '@angular/router';
import { FormExampleLoader } from '../examples/form-example.loader';

export const editorsRoutes: Routes = [
  {
    path: '',
    providers: [FormExampleLoader],
    children: [
      {
        path: 'bootstrap',
        loadChildren: () => import('./bootstrap/bootstrap-editor.routes').then(m => m.bootstrapEditorRoutes),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material-editor.routes').then(m => m.materialEditorRoutes),
      },
    ],
  },
];
