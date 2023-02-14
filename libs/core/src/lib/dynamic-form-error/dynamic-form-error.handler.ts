import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormError } from './dynamic-form-error';
import { DynamicFormErrorSettings, dynamicFormErrorSettingsDefault, DYNAMIC_FORM_ERROR_SETTINGS } from './dynamic-form-error-settings';
import { DynamicFormErrorType } from './dynamic-form-error-type';
import { DynamicFormLogger } from './dynamic-form.logger';

@Injectable()
export class DynamicFormErrorHandler {
  constructor(
    private logger: DynamicFormLogger,
    @Optional() @Inject(DYNAMIC_FORM_ERROR_SETTINGS)
    readonly settings: DynamicFormErrorSettings,
  ) {
    this.settings = this.settings || dynamicFormErrorSettingsDefault;
  }

  handle<ErrorType extends DynamicFormErrorType = DynamicFormErrorType>(error: DynamicFormError<ErrorType>): void {
    this.logger.error(error.type, error.message);
    if (this.settings.throw) {
      throw error;
    }
  }

  handleUndefined<Value, ErrorType extends DynamicFormErrorType = DynamicFormErrorType>(
    value: Value | undefined, createError: () => DynamicFormError<ErrorType>,
  ): Value | undefined {
    if (!value) {
      this.handle(createError());
      return undefined;
    }
    return value;
  }
}
