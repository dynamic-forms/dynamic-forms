import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Version } from '../../../state/config/config.model';
import { ConfigState } from '../../../state/config/config.state';

@Component({
  selector: 'app-versions-menu',
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './versions-menu.component.html',
})
export class VersionsMenuComponent {
  @Select(ConfigState.versions)
  versions$: Observable<Version[]>;
}
