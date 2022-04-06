import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DocsMenuModule } from './docs-menu/docs-menu.module';
import { EditorMenuModule } from './editor-menu/editor-menu.module';
import { ExamplesMenuModule } from './examples-menu/examples-menu.module';
import { HeaderComponent } from './header.component';
import { NotificationsToggleModule } from './notifications-toggle/notifications-toggle.module';
import { HeaderPipesModule } from './pipes/pipes.module';
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
    HeaderPipesModule,
    EditorMenuModule,
    ExamplesMenuModule,
    NotificationsToggleModule,
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
