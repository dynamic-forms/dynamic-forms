import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExamplesMenuListComponent } from './examples-menu-list.component';
import { ExamplesMenuComponent } from './examples-menu.component';

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
    ExamplesMenuComponent,
    ExamplesMenuListComponent
  ],
  exports: [
    ExamplesMenuComponent
  ]
})
export class ExamplesMenuModule {}
