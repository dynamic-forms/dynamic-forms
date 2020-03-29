import { Inject, Injectable } from '@angular/core';
import { DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormLibraryService {
  readonly libraryNames: DynamicFormLibraryName[];
  readonly libraryNamesReverse: DynamicFormLibraryName[];

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY)
    readonly library: DynamicFormLibrary
  ) {
    this.libraryNames = this.getLibraryNames();
    this.libraryNamesReverse = [ ...this.libraryNames ].reverse();
  }

  filterTypes<Type extends  { type: string, libraryName: DynamicFormLibraryName }>(types: Type[]): Type[] {
    if (!types || !types.length) {
      return [];
    }

    return this.libraryNames.reduce((filteredTypes, libraryName) => {
      const libraryTypes = this.getLibraryTypes(libraryName, types, filteredTypes);
      return filteredTypes.concat(libraryTypes);
    }, []);
  }

  private getLibraryTypes<Type extends { type: string, libraryName: DynamicFormLibraryName }>(
    name: DynamicFormLibraryName, types: Type[], excludeTypes: Type[]): Type[] {
    if (excludeTypes && excludeTypes.length) {
      const excludeTypeNames = excludeTypes.map(type => type.type);
      return types.filter(type => type.libraryName === name && !excludeTypeNames.includes(type.type));
    }
    return types.filter(type => type.libraryName === name);
  }

  private getLibraryNames(): DynamicFormLibraryName[] {
    const referenceLibraryNames = this.library.references || [];
    const referenceLibraryNamesReverse = [ ...referenceLibraryNames ].reverse();
    return [ this.library.name, ...referenceLibraryNamesReverse ];
  }
}
