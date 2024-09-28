import { TestBed, inject } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { importDynamicFormsProviders } from '../dynamic-forms.module';
import { dynamicFormConsoleLogger } from './dynamic-form-console.logger';
import { DYNAMIC_FORM_ERROR_SETTINGS, DynamicFormErrorSettings } from './dynamic-form-error-settings';
import { DynamicFormErrorHandler } from './dynamic-form-error.handler';
import {
  dynamicFormErrorProviders,
  withDynamicFormErrorSettings,
  withDynamicFormLoggerSettings,
  withDynamicFormLoggers,
} from './dynamic-form-error.module';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DYNAMIC_FORM_LOGGER_SETTINGS, DynamicFormLoggerSettings } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG, DynamicFormLoggerTypeConfig } from './dynamic-form-logger-type-config';
import { DynamicFormLogger } from './dynamic-form.logger';

describe('DynamicFormErrorModule', () => {
  describe('without providers', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ providers: dynamicFormErrorProviders });
    });

    it('does not provide DynamicFormErrorHandler', () => {
      expect(() => TestBed.inject(DynamicFormErrorHandler)).toThrowError(/NullInjectorError/);
    });

    it('does not provide DynamicFormLogger', () => {
      expect(() => TestBed.inject(DynamicFormLogger)).toThrowError(/NullInjectorError/);
    });

    it('provides DYNAMIC_FORM_LOGGER_TYPE_CONFIG with dynamicFormConsoleLogger', inject(
      [DYNAMIC_FORM_LOGGER_TYPE_CONFIG],
      (config: DynamicFormLoggerTypeConfig) => {
        expect(config.length).toBe(1);
        expect(config[0]).toBe(dynamicFormConsoleLogger);
      },
    ));
  });

  describe('with DynamicFormLibraryService provided', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: DynamicFormLibraryService,
            useValue: new DynamicFormLibraryService({ name: 'test' }),
          },
          ...dynamicFormErrorProviders,
        ],
      });
    });

    it('provides DynamicFormErrorHandler', inject([DynamicFormErrorHandler], (service: DynamicFormErrorHandler) => {
      expect(service).toBeTruthy();
    }));

    it('provides DynamicFormLogger', inject([DynamicFormLogger], (service: DynamicFormLogger) => {
      expect(service).toBeTruthy();
    }));
  });

  describe('withErrorSettings', () => {
    const errorSettings: DynamicFormErrorSettings = { throw: false };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormErrorSettings(errorSettings)),
      });
    });

    it('provides DYNAMIC_FORM_ERROR_SETTINGS', inject([DYNAMIC_FORM_ERROR_SETTINGS], (settings: DynamicFormErrorSettings) => {
      expect(settings).toBe(errorSettings);
    }));
  });

  describe('withLoggerSettings', () => {
    const loggerSettings: DynamicFormLoggerSettings = { logLevel: DynamicFormLogLevel.Warning };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormLoggerSettings(loggerSettings)),
      });
    });

    it('provides DYNAMIC_FORM_LOGGER_SETTINGS', inject([DYNAMIC_FORM_LOGGER_SETTINGS], (settings: DynamicFormLoggerSettings) => {
      expect(settings).toBe(loggerSettings);
    }));
  });

  describe('withLogger', () => {
    const loggerType = { type: 'logger' } as DynamicFormLoggerType;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormLoggers(loggerType)),
      });
    });

    it('provides DYNAMIC_FORM_LOGGER_TYPE_CONFIG', inject([DYNAMIC_FORM_LOGGER_TYPE_CONFIG], (config: DynamicFormLoggerTypeConfig) => {
      expect(config.length).toBe(1);
      expect(config[0]).toBe(loggerType);
    }));
  });

  describe('withLoggers', () => {
    const loggerTypes = [{ type: 'logger1' }, { type: 'logger2' }] as DynamicFormLoggerType[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: importDynamicFormsProviders(withDynamicFormLoggers(...loggerTypes)),
      });
    });

    it('provides DYNAMIC_FORM_LOGGER_TYPE_CONFIG', inject([DYNAMIC_FORM_LOGGER_TYPE_CONFIG], (config: DynamicFormLoggerTypeConfig) => {
      expect(config.length).toBe(2);
      expect(config[0]).toBe(loggerTypes[0]);
      expect(config[1]).toBe(loggerTypes[1]);
    }));
  });
});
