import { MediaMatcher } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { CONFIG } from '../../state/config/config.model';
import { DocsMenuComponent } from './docs-menu/docs-menu.component';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';
import { ExamplesMenuComponent } from './examples-menu/examples-menu.component';
import { NotificationsToggleComponent } from './notifications-toggle/notifications-toggle.component';
import { CodeUrlPipe } from './pipes/code-url.pipe';
import { PreferencesMenuComponent } from './preferences-menu/preferences-menu.component';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { VersionsMenuComponent } from './versions-menu/versions-menu.component';

@Component({
  selector: 'app-header',
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CodeUrlPipe,
    DocsMenuComponent,
    EditorMenuComponent,
    ExamplesMenuComponent,
    PreferencesMenuComponent,
    NotificationsToggleComponent,
    SidebarToggleComponent,
    VersionsMenuComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly media = inject(MediaMatcher);
  readonly docsQuery = this.media.matchMedia('(max-width: 825px)');
  readonly examplesQuery = this.media.matchMedia('(max-width: 450px)');
  readonly editorsQuery = this.media.matchMedia('(max-width: 550px)');
  readonly versionsQuery = this.media.matchMedia('(max-width: 675px)');
  readonly config$ = inject(Store).select(CONFIG);
}
