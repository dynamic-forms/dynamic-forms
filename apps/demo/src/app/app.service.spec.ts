import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngxs/store';
import { MockProviders } from 'ng-mocks';
import { AppService } from './app.service';
import { IconService } from './services/icon.service';
import { ThemeService } from './services/theme.service';
import { ConfigService } from './state/config/config.service';
import { ExamplesService } from './state/examples/examples.service';

describe('AppService', () => {
  let configService: ConfigService;
  let examplesService: ExamplesService;
  let iconService: IconService;
  let themeService: ThemeService;
  let appService: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore(), MockProviders(ConfigService, ExamplesService, IconService, ThemeService)],
    });

    appService = TestBed.inject(AppService);
    configService = TestBed.inject(ConfigService);
    examplesService = TestBed.inject(ExamplesService);
    iconService = TestBed.inject(IconService);
    themeService = TestBed.inject(ThemeService);
  });

  it('init calls services', () => {
    spyOn(configService, 'load');
    spyOn(examplesService, 'load');
    spyOn(iconService, 'register');
    spyOn(themeService, 'init');

    appService.init();

    expect(configService.load).toHaveBeenCalled();
    expect(examplesService.load).toHaveBeenCalled();
    expect(iconService.register).toHaveBeenCalled();
    expect(themeService.init).toHaveBeenCalled();
  });
});
