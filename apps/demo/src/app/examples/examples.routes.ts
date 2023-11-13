import { Routes } from '@angular/router';
import { FormExampleLoader } from './form-example.loader';

export const examplesRoutes: Routes = [
  {
    path: '',
    providers: [FormExampleLoader],
    children: [
      {
        path: 'bootstrap',
        loadChildren: () => import('./bootstrap/bootstrap-examples.routes').then(m => m.bootstrapExamplesRoutes),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material-examples.routes').then(m => m.materialExamplesRoutes),
      },
    ],
  },
];
