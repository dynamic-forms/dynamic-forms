import { InjectionToken } from '@angular/core';
import { DynamicFormLibraryName } from '../../dynamic-form-library/dynamic-form-library';

export interface DynamicFormIconConfig {
  icons: Record<string, string>;
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormIconConfigs = DynamicFormIconConfig[];

export const DYNAMIC_FORM_ICON_CONFIGS = new InjectionToken<DynamicFormIconConfigs>('DynamicFormIconConfigs');
