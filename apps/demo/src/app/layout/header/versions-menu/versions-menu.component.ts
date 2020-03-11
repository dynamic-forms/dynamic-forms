import { Component, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Config, CONFIG } from '../../../state/config/config.model';

@Component({
  selector: 'app-versions-menu',
  templateUrl: './versions-menu.component.html',
  styleUrls: ['./versions-menu.component.scss']
})
export class VersionsMenuComponent {
  @Select(CONFIG)
  config$: Observable<Config>;
}
