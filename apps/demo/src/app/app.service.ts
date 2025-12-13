import { Injectable, inject } from '@angular/core';
import { IconService } from './services/icon.service';
import { ThemeService } from './services/theme.service';
import { ConfigService } from './state/config/config.service';
import { ExamplesService } from './state/examples/examples.service';
import { RoutingHandler } from './state/routing/routing.handler';

@Injectable({ providedIn: 'root' })
export class AppService {
  private readonly themeService = inject(ThemeService);
  private readonly configService = inject(ConfigService);
  private readonly examplesService = inject(ExamplesService);
  private readonly iconService = inject(IconService);
  private readonly routingHandler = inject(RoutingHandler);

  init(): void {
    this.themeService.init();
    this.configService.load();
    this.examplesService.load();
    this.iconService.register();
    this.routingHandler.init();
  }
}
