import { Inject, Injectable } from '@angular/core';
import { DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormLibraryService {
  readonly libraryNames: DynamicFormLibraryName[];

  constructor(@Inject(DYNAMIC_FORM_LIBRARY) readonly library: DynamicFormLibrary) {
    this.libraryNames = this.getLibraryNames();
  }

  private getLibraryNames(): DynamicFormLibraryName[] {
    const referenceLibraryNames = this.library.references || [];
    const referenceLibraryNamesReverse = [ ...referenceLibraryNames ].reverse();
    return [ this.library.name, ...referenceLibraryNamesReverse ];
  }
}
