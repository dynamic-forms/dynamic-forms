import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormLibraryService } from '../dynamic-form-library/dynamic-form-library.service';
import { DYNAMIC_FORM_VALIDATION_CONFIGS, DynamicFormValidationConfig,
  DynamicFormValidationConfigs } from './dynamic-form-validation-config';
import { DynamicFormValidationErrors } from './dynamic-form-validation-errors';

@Injectable()
export class DynamicFormValidationService {
  readonly validationConfig: DynamicFormValidationConfig;

  constructor(
    protected libraryService: DynamicFormLibraryService,
    @Optional() @Inject(DYNAMIC_FORM_VALIDATION_CONFIGS)
    private validationConfigs: DynamicFormValidationConfigs,
  ) {
    this.validationConfig = this.mergeValidationConfigs(this.validationConfigs);
  }

  getErrorMessage(errors: DynamicFormValidationErrors): string {
    if (!errors) {
      return null;
    }

    const keys = Object.keys(errors);
    if (!keys.length) {
      return this.getDefaultErrorMessage();
    }

    const errorKey = keys[0];
    const error = errors[errorKey];
    return error && error.message ? error.message : this.getErrorMessageFromConfig(errorKey, error);
  }

  private getErrorMessageFromConfig(errorKey: string, error: any): string {
    const message = this.validationConfig.messages[errorKey];
    if (typeof message === 'string') {
      return message;
    }
    if (typeof message === 'function') {
      return message(error);
    }
    return this.validationConfig.defaultMessage;
  }

  private getDefaultErrorMessage(): string {
    return this.validationConfig.defaultMessage;
  }

  private mergeValidationConfigs(configs: DynamicFormValidationConfigs): DynamicFormValidationConfig {
    const library = this.libraryService.library;
    const libraryName = library.name;
    const defaultConfig = { defaultMessage: undefined, messages: {}, libraryName };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const libraryConfigs = this.getLibraryConfigs(configs);
    return libraryConfigs.reduce((result, config) => {
      return {
        ...result, ...config,
        messages: { ...result.messages, ...config.messages },
        libraryName,
      };
    }, defaultConfig);
  }

  private getLibraryConfigs(configs: DynamicFormValidationConfigs): DynamicFormValidationConfigs {
    return this.libraryService.libraryNamesReverse
      .map(name => configs.find(config => config.libraryName === name))
      .filter(config => !!config);
  }
}
