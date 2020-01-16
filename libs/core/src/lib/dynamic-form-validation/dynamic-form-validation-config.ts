import { InjectionToken } from '@angular/core';
import { DynamicFormLibrary } from '../dynamic-form-config/dynamic-form-library';

export interface DynamicFormValidationConfig {
  library: DynamicFormLibrary;
  defaultMessage: string;
  messages: { [key: string]: string };
}

export type DynamicFormValidationConfigs = DynamicFormValidationConfig[];

export const DYNAMIC_FORM_VALIDATION_CONFIGS = new InjectionToken<DynamicFormValidationConfigs>('DynamicFormValidationConfigs');

export const dynamicFormValidationConfig: DynamicFormValidationConfig = {
  library: 'core',
  defaultMessage: 'The field is invalid.',
  messages: {
    required: 'The field is required.',
    email: 'The field is not an email.',
    pattern: 'The field does not fit the pattern.',
    min: 'The field does not fit the min value',
    max: 'The field does not fit the max value',
    minlength: 'The field does not fit the min length',
    maxlength: 'The field does not fit the max length'
  }
};
