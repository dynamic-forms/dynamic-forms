import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Version } from '../../../state/config/config.model';
import { ConfigState } from '../../../state/config/config.state';

@Component({
  selector: 'app-versions-menu',
  templateUrl: './versions-menu.component.html',
  styleUrls: ['./versions-menu.component.scss'],
})
export class VersionsMenuComponent {
  @Select(ConfigState.versions)
  versions$: Observable<Version[]>;
}
