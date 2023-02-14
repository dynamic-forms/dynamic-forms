import { InjectionToken } from '@angular/core';

export interface DynamicFormIdBuilder {
  createId: () => string;
}

export const DYNAMIC_FORM_ID_BUILDER = new InjectionToken<DynamicFormIdBuilder>('DynamicFormIdBuilder');
