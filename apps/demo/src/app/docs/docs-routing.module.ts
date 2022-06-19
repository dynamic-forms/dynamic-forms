import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'core',
        pathMatch: 'full',
      },
      {
        path: 'core',
        loadChildren: () => import('./core/core-docs.module').then(m => m.CoreDocsModule),
      },
      {
        path: 'bootstrap',
        loadChildren: () => import('./bootstrap/bootstrap-docs.module').then(m => m.BootstrapDocsModule),
      },
      {
        path: 'material',
        loadChildren: () => import('./material/material-docs.module').then(m => m.MaterialDocsModule),
      },
      {
        path: 'markdown',
        loadChildren: () => import('./markdown/markdown-docs.module').then(m => m.MarkdownDocsModule),
      },
      {
        path: 'changelog',
        loadChildren: () => import('./changelog/changelog.module').then(m => m.ChangelogModule),
      },
    ]),
  ],
  exports: [
    RouterModule,
  ],
})
export class DocsRoutingModule {}
