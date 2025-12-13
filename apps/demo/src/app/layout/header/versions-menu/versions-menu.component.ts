import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { ConfigState } from '../../../state/config/config.state';

@Component({
  selector: 'app-versions-menu',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './versions-menu.component.html',
})
export class VersionsMenuComponent {
  readonly versions$ = inject(Store).select(ConfigState.versions);
}
