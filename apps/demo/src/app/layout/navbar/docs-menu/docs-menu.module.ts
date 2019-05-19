import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DocsMenuListComponent } from './docs-menu-list.component';
import { DocsMenuComponent } from './docs-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  declarations: [
    DocsMenuListComponent,
    DocsMenuComponent
  ],
  exports: [
    DocsMenuComponent
  ]
})
export class DocsMenuModule {}
