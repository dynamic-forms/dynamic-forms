import { InjectionToken } from '@angular/core';

export interface DynamicFormLibrary {
  name: 'core' | string;
}

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<DynamicFormLibrary>('DynamicFormLibrary');

export const dynamicFormLibrary: DynamicFormLibrary = {
  name: 'core'
};
