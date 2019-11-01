import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ExamplesMenuPanelComponent } from './examples-menu-panel.component';
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
    ExamplesMenuPanelComponent
  ],
  exports: [
    ExamplesMenuComponent
  ]
})
export class ExamplesMenuModule {}
