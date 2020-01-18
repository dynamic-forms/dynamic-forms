import { InjectionToken } from '@angular/core';

export type DynamicFormLibrary = 'core' | string;

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<DynamicFormLibrary>('DynamicFormLibrary');

export const dynamicFormLibrary: DynamicFormLibrary = 'core';
