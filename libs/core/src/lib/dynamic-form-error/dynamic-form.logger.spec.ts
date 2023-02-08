import { TestBed } from '@angular/core/testing';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DynamicFormLog } from './dynamic-form-log';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DYNAMIC_FORM_LOGGER_SETTINGS } from './dynamic-form-logger-settings';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';
import { DYNAMIC_FORM_LOGGER_TYPE_CONFIG } from './dynamic-form-logger-type-config';
import { DynamicFormLogger } from './dynamic-form.logger';

describe('DynamicFormLogger', () => {
  let service: DynamicFormLogger;

  const loggerTypes: DynamicFormLoggerType[] = [
    { libraryName: 'test', type: 'logger', enabled: true, log: () => {} },
    { libraryName: 'test', type: 'logger1', enabled: false, log: () => {} },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DynamicFormLibraryService,
          useValue: new DynamicFormLibraryService({ name: 'test' }),
        },
        {
          provide: DYNAMIC_FORM_LOGGER_TYPE_CONFIG,
          useValue: loggerTypes,
        },
        {
          provide: DYNAMIC_FORM_LOGGER_SETTINGS,
          useValue: { logLevel: DynamicFormLogLevel.Debug },
        },
        DynamicFormLogger,
      ],
    });

    service = TestBed.inject(DynamicFormLogger);
  });

  it('returns logger types', () => {
    expect(service.loggerTypes).toEqual(loggerTypes);
  });


  it('returns settings', () => {
    expect(service.settings).toEqual({ logLevel: DynamicFormLogLevel.Debug });
  });

  it('logs error', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.error('type', 'message');

    expect(loggerTypes[0].log).toHaveBeenCalledOnceWith(jasmine.objectContaining<DynamicFormLog>({
        level: DynamicFormLogLevel.Error,
        type: 'type',
        message: 'message',
    }));
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('logs warning', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.warning('type', 'message');

    expect(loggerTypes[0].log).toHaveBeenCalledOnceWith(jasmine.objectContaining<DynamicFormLog>({
        level: DynamicFormLogLevel.Warning,
        type: 'type',
        message: 'message',
    }));
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('does not log warning if log level is error', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.settings.logLevel = DynamicFormLogLevel.Error;

    service.warning('type', 'message');

    expect(loggerTypes[0].log).not.toHaveBeenCalled();
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('logs information', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.information('type', 'message');

    expect(loggerTypes[0].log).toHaveBeenCalledOnceWith(jasmine.objectContaining<DynamicFormLog>({
        level: DynamicFormLogLevel.Information,
        type: 'type',
        message: 'message',
    }));
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('does not log information if log level is warning', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.settings.logLevel = DynamicFormLogLevel.Warning;

    service.information('type', 'message');

    expect(loggerTypes[0].log).not.toHaveBeenCalled();
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('logs debug', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.debug('type', 'message');

    expect(loggerTypes[0].log).toHaveBeenCalledOnceWith(jasmine.objectContaining<DynamicFormLog>({
        level: DynamicFormLogLevel.Debug,
        type: 'type',
        message: 'message',
    }));
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });

  it('does not log debug if log level is information', () => {
    spyOn(loggerTypes[0], 'log');
    spyOn(loggerTypes[1], 'log');

    service.settings.logLevel = DynamicFormLogLevel.Information;

    service.debug('type', 'message');

    expect(loggerTypes[0].log).not.toHaveBeenCalled();
    expect(loggerTypes[1].log).not.toHaveBeenCalled();
  });
});
