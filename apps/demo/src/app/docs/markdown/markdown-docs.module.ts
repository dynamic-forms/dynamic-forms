import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownCoverageComponent } from './coverage/markdown-coverage.component';
import { MarkdownDocComponent } from './doc/markdown-doc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'doc',
    pathMatch: 'full',
  },
  {
    path: 'doc',
    component: MarkdownDocComponent,
  },
  {
    path: 'coverage',
    component: MarkdownCoverageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    MarkdownCoverageComponent,
    MarkdownDocComponent,
  ],
  exports: [
    RouterModule,
  ],
})
export class MarkdownDocsModule {}
