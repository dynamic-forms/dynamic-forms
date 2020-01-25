import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarToggleComponent } from './sidebar-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SidebarToggleComponent
  ],
  exports: [
    SidebarToggleComponent
  ]
})
export class SidebarToggleModule {}
