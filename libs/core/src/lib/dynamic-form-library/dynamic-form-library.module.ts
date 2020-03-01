import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

@NgModule({
  providers: [
    DynamicFormLibraryService
  ]
})
export class DynamicFormLibraryModule {
  static forLibrary(library: DynamicFormLibrary): ModuleWithProviders<DynamicFormLibraryModule> {
    return {
      ngModule: DynamicFormLibraryModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: library
        }
      ]
    };
  }
}
