import { InjectionToken } from '@angular/core';

export interface DynamicFormErrorSettings {
  throw: boolean;
}

export const DYNAMIC_FORM_ERROR_SETTINGS = new InjectionToken<DynamicFormErrorSettings>('DynamicFormErrorSettings');

export const dynamicFormErrorSettingsDefault: DynamicFormErrorSettings = {
  throw: false,
};
