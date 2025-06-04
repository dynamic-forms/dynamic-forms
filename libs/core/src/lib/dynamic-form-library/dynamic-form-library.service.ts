import { Inject, Injectable } from '@angular/core';
import { DYNAMIC_FORM_LIBRARY, DynamicFormLibrary, DynamicFormLibraryName } from './dynamic-form-library';

export interface TypeBase {
  type: string;
  libraryName: DynamicFormLibraryName;
}

export interface TypeAliasBase {
  type: string;
  aliases?: string[];
  libraryName: DynamicFormLibraryName;
}

@Injectable()
export class DynamicFormLibraryService {
  readonly libraryNames: DynamicFormLibraryName[];
  readonly libraryNamesReverse: DynamicFormLibraryName[];

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY)
    readonly library: DynamicFormLibrary,
  ) {
    this.libraryNames = this.getLibraryNames();
    this.libraryNamesReverse = [...this.libraryNames].reverse();
  }

  filterTypes<Type extends TypeBase>(types: (Type | Type[])[]): Type[] {
    if (!types?.length) {
      return [];
    }

    return this.libraryNames.reduce((filteredTypes, libraryName) => {
      const libraryTypes = this.getLibraryTypes(libraryName, types, filteredTypes);
      return filteredTypes.concat(libraryTypes);
    }, []);
  }

  filterTypesMap<Type extends TypeBase>(types: (Type | Type[])[]): Map<string, Type> {
    const filteredTypes = this.filterTypes(types);
    return new Map(filteredTypes.map(type => [type.type, type]));
  }

  filterTypesMapWithAliases<Type extends TypeAliasBase>(types: (Type | Type[])[]): Map<string, Type> {
    const filteredTypes = this.filterTypes(types);
    return filteredTypes.reduce((result, type) => {
      if (!result.has(type.type)) {
        result.set(type.type, type);
      }
      for (const alias of type.aliases || []) {
        if (!result.has(alias)) {
          result.set(alias, type);
        }
      }
      return result;
    }, new Map<string, Type>());
  }

  private getLibraryTypes<Type extends { type: string; libraryName: DynamicFormLibraryName }>(
    name: DynamicFormLibraryName,
    types: (Type | Type[])[],
    excludeTypes: Type[],
  ): Type[] {
    const typesFlattened = this.getTypesFlattened(types);
    if (excludeTypes?.length) {
      const excludeTypeNames = excludeTypes.map(type => type.type);
      return typesFlattened.filter(type => type.libraryName === name && !excludeTypeNames.includes(type.type));
    }
    return typesFlattened.filter(type => type.libraryName === name);
  }

  private getTypesFlattened<Type>(types: (Type | Type[])[]): Type[] {
    return types.reduce<Type[]>((result, type) => result.concat(type), []);
  }

  private getLibraryNames(): DynamicFormLibraryName[] {
    const referenceLibraryNames = this.library.references || [];
    const referenceLibraryNamesReverse = [...referenceLibraryNames].reverse();
    return [this.library.name, ...referenceLibraryNamesReverse];
  }
}
