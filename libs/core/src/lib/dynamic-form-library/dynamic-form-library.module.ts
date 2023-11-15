import { ModuleWithProviders, NgModule } from '@angular/core';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary } from './dynamic-form-library';
import { DynamicFormLibraryService } from './dynamic-form-library.service';

@NgModule({
  providers: [DynamicFormLibraryService],
})
export class DynamicFormLibraryModule {
  static forLibrary(library: DynamicFormLibrary): ModuleWithProviders<DynamicFormLibraryModule> {
    return {
      ngModule: DynamicFormLibraryModule,
      providers: [
        {
          provide: DYNAMIC_FORM_LIBRARY,
          useValue: library,
        },
      ],
    };
  }
}
