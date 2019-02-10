import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {}
