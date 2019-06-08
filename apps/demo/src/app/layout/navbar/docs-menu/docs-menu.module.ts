import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { DocsMenuItemsComponent } from './docs-menu-items.component';
import { DocsMenuComponent } from './docs-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    DocsMenuItemsComponent,
    DocsMenuComponent
  ],
  exports: [
    DocsMenuComponent
  ]
})
export class DocsMenuModule {}
