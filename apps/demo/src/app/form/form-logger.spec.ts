import { DynamicFormErrorType, DynamicFormLogLevel } from '@dynamic-forms/core';
import { firstValueFrom } from 'rxjs';
import { FormLogger, formLoggerTypeFactory } from './form-logger';

describe('FormLogger', () => {
  let formLogger: FormLogger;

  beforeEach(() => {
    formLogger = new FormLogger();
  });

  it('logs', async () => {
    const log = { timestamp: new Date(), level: DynamicFormLogLevel.Error, type: DynamicFormErrorType.Unspecified, message: 'Error' };

    const logPromise = firstValueFrom(formLogger.log$);

    formLogger.log(log);

    expect(await logPromise).toEqual(log);
  });

  it('formLoggerTypeFactory returns logger type', () => {
    const loggerType = formLoggerTypeFactory(formLogger);

    expect(loggerType.type).toBe('dynamic-form-logger');
    expect(loggerType.libraryName).toBe('core');
    expect(loggerType.enabled).toBeTrue();
    expect(loggerType.log).toBeInstanceOf(Function);
  });

  it('formLoggerTypeFactory returns logger type which logs', async () => {
    const log = { timestamp: new Date(), level: DynamicFormLogLevel.Error, type: DynamicFormErrorType.Unspecified, message: 'Error' };
    const loggerType = formLoggerTypeFactory(formLogger);

    const logPromise = firstValueFrom(formLogger.log$);

    loggerType.log(log);

    expect(await logPromise).toEqual(log);
  });
});
