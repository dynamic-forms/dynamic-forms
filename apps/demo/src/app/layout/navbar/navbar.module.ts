import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DocsMenuComponent } from './docs-menu/docs-menu.component';
import { ExamplesMenuComponent } from './examples-menu/examples-menu.component';
import { NavbarComponent } from './navbar.component';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: [
    NavbarComponent,
    SidebarToggleComponent,
    DocsMenuComponent,
    ExamplesMenuComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {}
