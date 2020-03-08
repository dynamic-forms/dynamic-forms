import { Component, Inject } from '@angular/core';
import { AppConfig, AppVersion, APP_CONFIG } from '../../../app-config';

@Component({
  selector: 'app-versions-menu',
  templateUrl: './versions-menu.component.html',
  styleUrls: ['./versions-menu.component.scss']
})
export class VersionsMenuComponent {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  get versions(): AppVersion[] { return this.appConfig.versions; }
}
