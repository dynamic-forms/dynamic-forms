/* eslint-disable no-console */
import { dynamicFormConsoleLogger } from './dynamic-form-console.logger';
import { DynamicFormErrorType } from './dynamic-form-error-type';
import { DynamicFormLogLevel } from './dynamic-form-log-level';
import { DynamicFormLoggerType } from './dynamic-form-logger-type';

describe('dynamicFormConsoleLogger', () => {
  let logger: DynamicFormLoggerType;

  beforeEach(() => {
    logger = dynamicFormConsoleLogger;
  });

  it('enabled returns true by default', () => {
    expect(logger.enabled).toBeTrue();
  });

  it('log calls error of console', () => {
    spyOn(console, 'error');

    const log = {
      timestamp: new Date(),
      level: DynamicFormLogLevel.Error,
      type: DynamicFormErrorType.Unspecified,
      message: 'Error creating dynamic form',
      data: ['Stack trace information'],
    };

    logger.log(log);

    expect(console.error).toHaveBeenCalledWith('Unspecified error: Error creating dynamic form:\n', ...log.data);
  });

  it('log calls warn of console', () => {
    spyOn(console, 'warn');

    const log = {
      timestamp: new Date(),
      level: DynamicFormLogLevel.Warning,
      type: 'Expression evaluation warning',
      message: 'Evaluation of expression returned undefined',
    };

    logger.log(log);

    expect(console.warn).toHaveBeenCalledWith('Expression evaluation warning: Evaluation of expression returned undefined.');
  });

  it('log calls info of console', () => {
    spyOn(console, 'info');

    const log = {
      timestamp: new Date(),
      level: DynamicFormLogLevel.Information,
      type: 'Expression evaluation information',
      message: 'Evaluation of expression returned null',
    };

    logger.log(log);

    expect(console.info).toHaveBeenCalledWith('Expression evaluation information: Evaluation of expression returned null.');
  });

  it('log calls info of console', () => {
    spyOn(console, 'debug');

    const log = {
      timestamp: new Date(),
      level: DynamicFormLogLevel.Debug,
      type: 'Expression evaluation debugging',
      message: 'Evaluation of expression returned null',
    };

    logger.log(log);

    expect(console.debug).toHaveBeenCalledWith('Expression evaluation debugging: Evaluation of expression returned null.');
  });
});
