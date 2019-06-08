import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExamplesMenuItemsComponent } from './examples-menu-items.component';
import { ExamplesMenuComponent } from './examples-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  declarations: [
    ExamplesMenuComponent,
    ExamplesMenuItemsComponent
  ],
  exports: [
    ExamplesMenuComponent
  ]
})
export class ExamplesMenuModule {}
