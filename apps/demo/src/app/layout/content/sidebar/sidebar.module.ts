import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule {}
