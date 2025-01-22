import { InjectionToken } from '@angular/core';
import { DynamicFormLibraryName } from '../dynamic-form-library/dynamic-form-library';

export interface DynamicFormColorConfig {
  colors: Record<string, string>;
  libraryName: DynamicFormLibraryName;
}

export type DynamicFormColorConfigs = DynamicFormColorConfig[];

export const DYNAMIC_FORM_COLOR_CONFIGS = new InjectionToken<DynamicFormColorConfigs>('DynamicFormColorConfigs');
