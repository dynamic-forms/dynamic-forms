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
    loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule),
  },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.module').then(m => m.ExamplesModule),
  },
  {
    path: 'license',
    loadComponent: () => import('./license/license.component').then(m => m.LicenseComponent),
  },
];