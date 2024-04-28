import { Injectable } from '@angular/core';
import { IconService } from './services/icon.service';
import { ThemeService } from './services/theme-service';
import { ConfigService } from './state/config/config.service';
import { ExamplesService } from './state/examples/examples.service';
import { RoutingHandler } from './state/routing/routing.handler';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    protected themeService: ThemeService,
    protected configService: ConfigService,
    protected examplesService: ExamplesService,
    protected iconService: IconService,
    protected routingHandler: RoutingHandler,
  ) {}

  init(): void {
    this.themeService.init();
    this.configService.load();
    this.examplesService.load();
    this.iconService.register();
  }
}

export const appInitializer =
  (appService: AppService): (() => void) =>
  () =>
    appService.init();
