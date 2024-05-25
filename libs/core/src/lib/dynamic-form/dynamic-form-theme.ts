import { InjectionToken } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';

export const DYNAMIC_FORM_THEME = new InjectionToken<string>('DynamicFormTheme');

export function withDynamicFormsTheme(theme: string): DynamicFormsFeature {
  return { providers: [{ provide: DYNAMIC_FORM_THEME, useValue: theme }] };
}
