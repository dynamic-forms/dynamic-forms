import { InjectionToken } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';

export interface DynamicFormIdBuilder {
  createId: () => string;
}

export const DYNAMIC_FORM_ID_BUILDER = new InjectionToken<DynamicFormIdBuilder>('DynamicFormIdBuilder');

export function withDynamicFormsIdBuilder(idBuilder?: DynamicFormIdBuilder): DynamicFormsFeature {
  return { providers: [{ provide: DYNAMIC_FORM_ID_BUILDER, useValue: idBuilder }] };
}
