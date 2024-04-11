import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

export const dynamicFormLibraryProviders: Provider[] = [DynamicFormLibraryService];

export function withDynamicFormsLibrary(library: DynamicFormLibrary): DynamicFormsFeature {
  return { providers: [{ provide: DYNAMIC_FORM_LIBRARY, useValue: library }] };
}

/**
 * @deprecated Use {@link dynamicFormLibraryProviders} instead.
 */
@NgModule({ providers: dynamicFormLibraryProviders })
export class DynamicFormLibraryModule {
  /**
   * @deprecated Use {@link provideDynamicForms} instead.
   */
  static forLibrary(library: DynamicFormLibrary): ModuleWithProviders<DynamicFormLibraryModule> {
    const provider = { provide: DYNAMIC_FORM_LIBRARY, useValue: library };
    return { ngModule: DynamicFormLibraryModule, providers: [provider] };
  }
}
