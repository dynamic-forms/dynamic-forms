import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../../app-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  get projectUrl() { return this.appConfig.project.url; }
}
