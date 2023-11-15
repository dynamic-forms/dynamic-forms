import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.routes').then(m => m.docsRoutes),
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.routes').then(m => m.editorsRoutes),
  },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.routes').then(m => m.examplesRoutes),
  },
  {
    path: 'license',
    loadComponent: () => import('./license/license.component').then(m => m.LicenseComponent),
  },
];
