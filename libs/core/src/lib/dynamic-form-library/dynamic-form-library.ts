import { InjectionToken } from '@angular/core';

export type DynamicFormLibraryName = 'core' | string;

export interface DynamicFormLibrary {
  name: DynamicFormLibraryName;
  references?: DynamicFormLibraryName[];
}

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<DynamicFormLibrary>('DynamicFormLibrary');

export const dynamicFormLibrary: DynamicFormLibrary = {
  name: 'core'
};
