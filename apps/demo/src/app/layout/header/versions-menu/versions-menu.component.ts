import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../../app-config';

@Component({
  selector: 'app-versions-menu',
  templateUrl: './versions-menu.component.html',
  styleUrls: ['./versions-menu.component.scss']
})
export class VersionsMenuComponent {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  get versions() { return this.appConfig.versions; }
}
