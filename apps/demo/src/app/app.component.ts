import { Component } from '@angular/core';
import { IconService } from './services/icon.service';
import { ConfigService } from './state/config/config.service';
import { RoutingHandler } from './state/routing/routing.handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    protected configService: ConfigService,
    protected iconService: IconService,
    protected routingHandler: RoutingHandler
  ) {
    this.configService.load();
    this.iconService.register();
  }
}
