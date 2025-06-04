import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type DynamicFormLibraryName = 'core' | string;

export interface DynamicFormLibrary {
  name: DynamicFormLibraryName;
  references?: DynamicFormLibraryName[];
}

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<DynamicFormLibrary>('DynamicFormLibrary');

export const dynamicFormLibrary: DynamicFormLibrary = {
  name: 'core',
};
