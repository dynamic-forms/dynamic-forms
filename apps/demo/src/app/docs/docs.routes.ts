import { Routes } from '@angular/router';

export const docsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'core',
    pathMatch: 'full',
  },
  {
    path: 'core',
    children: [
      {
        path: '',
        redirectTo: 'doc',
        pathMatch: 'full',
      },
      {
        path: 'doc',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          sourceUrl: './assets/docs/core/index.html',
          scrolling: true,
        },
      },
      {
        path: 'coverage',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          title: 'Core - Code Coverage',
          sourceUrl: './assets/coverage/core/index.html',
        },
      },
    ],
  },
  {
    path: 'bootstrap',
    children: [
      {
        path: '',
        redirectTo: 'doc',
        pathMatch: 'full',
      },
      {
        path: 'doc',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          sourceUrl: './assets/docs/bootstrap/index.html',
          scrolling: true,
        },
      },
      {
        path: 'coverage',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          title: 'Bootstrap - Code Coverage',
          sourceUrl: './assets/coverage/bootstrap/index.html',
        },
      },
    ],
  },
  {
    path: 'material',
    children: [
      {
        path: '',
        redirectTo: 'doc',
        pathMatch: 'full',
      },
      {
        path: 'doc',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          sourceUrl: './assets/docs/material/index.html',
          scrolling: true,
        },
      },
      {
        path: 'coverage',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          title: 'Material - Code Coverage',
          sourceUrl: './assets/coverage/material/index.html',
        },
      },
    ],
  },
  {
    path: 'markdown',
    children: [
      {
        path: '',
        redirectTo: 'doc',
        pathMatch: 'full',
      },
      {
        path: 'doc',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          sourceUrl: './assets/docs/markdown/index.html',
          scrolling: true,
        },
      },
      {
        path: 'coverage',
        loadComponent: () => import('./docs.component').then(m => m.DocsComponent),
        data: {
          title: 'Markdown - Code Coverage',
          sourceUrl: './assets/coverage/markdown/index.html',
        },
      },
    ],
  },
  {
    path: 'changelog',
    loadComponent: () => import('./changelog.component').then(m => m.ChangelogComponent),
  },
];
