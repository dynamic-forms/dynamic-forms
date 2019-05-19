import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DocsMenuModule } from './docs-menu/docs-menu.module';
import { ExamplesMenuModule } from './examples-menu/examples-menu.module';
import { NavbarComponent } from './navbar.component';
import { SidebarToggleModule } from './sidebar-toggle/sidebar-toggle.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    DocsMenuModule,
    ExamplesMenuModule,
    SidebarToggleModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {}
