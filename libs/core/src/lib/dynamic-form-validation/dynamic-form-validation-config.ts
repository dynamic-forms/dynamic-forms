import { InjectionToken } from '@angular/core';

export interface DynamicFormValidationConfig {
  defaultMessage: string;
  messages: { [key: string]: string };
}

export type DynamicFormValidationConfigs = DynamicFormValidationConfig[];

export const DYNAMIC_FORM_VALIDATION_CONFIGS = new InjectionToken<DynamicFormValidationConfigs>('DynamicFormValidationConfigs');
