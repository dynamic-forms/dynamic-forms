import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Config, CONFIG } from '../../state/config/config.model';
import { DocsMenuComponent } from './docs-menu/docs-menu.component';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';
import { ExamplesMenuComponent } from './examples-menu/examples-menu.component';
import { NotificationsToggleComponent } from './notifications-toggle/notifications-toggle.component';
import { CodeUrlPipe } from './pipes/code-url.pipe';
import { PreferencesMenuModule } from './preferences-menu/preferences-menu.module';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { VersionsMenuComponent } from './versions-menu/versions-menu.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CodeUrlPipe,
    DocsMenuComponent,
    EditorMenuComponent,
    ExamplesMenuComponent,
    PreferencesMenuModule,
    NotificationsToggleComponent,
    SidebarToggleComponent,
    VersionsMenuComponent,
  ],
})
export class HeaderComponent {
  readonly docsQuery: MediaQueryList;
  readonly examplesQuery: MediaQueryList;
  readonly editorsQuery: MediaQueryList;
  readonly versionsQuery: MediaQueryList;

  @Select(CONFIG)
  config$: Observable<Config>;

  constructor(private media: MediaMatcher) {
    this.docsQuery = this.media.matchMedia('(max-width: 825px)');
    this.examplesQuery = this.media.matchMedia('(max-width: 450px)');
    this.editorsQuery = this.media.matchMedia('(max-width: 550px)');
    this.versionsQuery = this.media.matchMedia('(max-width: 675px)');
  }
}
