import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DocsMenuModule } from './docs-menu/docs-menu.module';
import { ExamplesMenuModule } from './examples-menu/examples-menu.module';
import { HeaderComponent } from './header.component';
import { SidebarToggleModule } from './sidebar-toggle/sidebar-toggle.module';
import { VersionsMenuModule } from './versions-menu/versions-menu.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    DocsMenuModule,
    ExamplesMenuModule,
    SidebarToggleModule,
    VersionsMenuModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {}
