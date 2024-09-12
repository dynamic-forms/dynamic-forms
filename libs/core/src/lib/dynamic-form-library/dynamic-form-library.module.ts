import { Provider } from '@angular/core';
import { DynamicFormsFeature } from '../dynamic-forms-feature';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

export const dynamicFormLibraryProviders: Provider[] = [DynamicFormLibraryService];

export function withDynamicFormsLibrary(library: DynamicFormLibrary): DynamicFormsFeature {
  return { providers: [{ provide: DYNAMIC_FORM_LIBRARY, useValue: library }] };
}
