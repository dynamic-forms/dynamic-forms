import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { EditorMenuPanelComponent } from './editor-menu-panel.component';
import { EditorMenuComponent } from './editor-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    EditorMenuComponent,
    EditorMenuPanelComponent,
  ],
  exports: [
    EditorMenuComponent,
  ],
})
export class EditorMenuModule {}
