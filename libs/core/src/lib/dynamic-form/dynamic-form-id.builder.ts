import { InjectionToken } from '@angular/core';

export type DynamicFormIdBuilder = () => string;

export const DYNAMIC_FORM_ID_BUILDER = new InjectionToken<DynamicFormIdBuilder>('DynamicFormIdBuilder');
