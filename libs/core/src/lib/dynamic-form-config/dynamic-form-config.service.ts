import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormActionTypes, DYNAMIC_FORM_ACTION_TYPES } from '../dynamic-form-action/dynamic-form-action-type';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfig, DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormClassType } from './dynamic-form-class-type';
import { DynamicFormComponentType } from './dynamic-form-component-type';
import { DynamicFormLibrary, DynamicFormLibraryName, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormConfigService {
  readonly libraryNames: DynamicFormLibraryName[];
  readonly elementTypes: DynamicFormElementTypes;
  readonly fieldTypes: DynamicFormFieldTypes;
  readonly actionTypes: DynamicFormActionTypes;
  readonly inputTypes: DynamicFormInputTypes;
  readonly fieldWrapperTypes: DynamicFormFieldWrapperTypes;
  readonly validationConfig: DynamicFormValidationConfig;

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY) readonly library: DynamicFormLibrary,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPES) private _elementTypes: DynamicFormElementTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPES) private _fieldTypes: DynamicFormFieldTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_ACTION_TYPES) private _actionTypes: DynamicFormActionTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPES) private _inputTypes: DynamicFormInputTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES) private _fieldWrapperTypes: DynamicFormFieldWrapperTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_VALIDATION_CONFIGS) private _validationConfigs: DynamicFormValidationConfigs = null
  ) {
    this.libraryNames = this.getLibraryNames();
    this.elementTypes = this.filterTypes(this._elementTypes);
    this.fieldTypes = this.filterTypes(this._fieldTypes);
    this.actionTypes = this.filterTypes(this._actionTypes);
    this.inputTypes = this.filterTypes(this._inputTypes);
    this.fieldWrapperTypes = this.filterTypes(this._fieldWrapperTypes);
    this.validationConfig = this.mergeValidationConfigs(this._validationConfigs);
  }

  getClassType(type: string): DynamicFormClassType {
    if (this.elementTypes.some(f => f.type === type)) {
      return 'element';
    } else if (this.fieldTypes.some(f => f.type === type)) {
      return 'field';
    } else if (this.actionTypes.some(f => f.type === type)) {
      return 'action';
    } else {
      return undefined;
    }
  }

  getElementType(type: string) {
    return this.elementTypes.find(f => f.type === type);
  }

  getFieldType(type: string) {
    return this.fieldTypes.find(f => f.type === type);
  }

  getActionType(type: string) {
    return this.actionTypes.find(f => f.type === type);
  }

  getInputType(type: string) {
    return this.inputTypes.find(f => f.type === type);
  }

  getFieldWrapperType(type: string) {
    return this.fieldWrapperTypes.find(f => f.type === type);
  }

  private getLibraryNames(): DynamicFormLibraryName[] {
    const referenceLibraryNames = this.library.references || [];
    const referenceLibraryNamesReverse = [ ...referenceLibraryNames ].reverse();
    return [ this.library.name, ...referenceLibraryNamesReverse ];
  }

  private filterTypes<Type extends DynamicFormComponentType>(types: Type[]): Type[] {
    if (!types || !types.length) {
      return [];
    }

    return this.libraryNames.reduce((filteredTypes, libraryName) => {
      const libraryTypes = this.getLibraryTypes(libraryName, types, filteredTypes);
      return filteredTypes.concat(libraryTypes);
    }, []);
  }

  private getLibraryTypes<Type extends DynamicFormComponentType>(
    name: DynamicFormLibraryName, types: Type[], excludeTypes: Type[]): Type[] {
    if (excludeTypes && excludeTypes.length) {
      const excludeTypeNames = excludeTypes.map(type => type.type);
      return types.filter(type => type.libraryName === name && !excludeTypeNames.includes(type.type));
    }
    return types.filter(type => type.libraryName === name);
  }

  private mergeValidationConfigs(configs: DynamicFormValidationConfigs): DynamicFormValidationConfig {
    const libraryName = this.library.name;
    const defaultConfig = { defaultMessage: undefined, messages: {}, libraryName };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const libraryConfigs = this.getLibraryConfigs(configs);
    return libraryConfigs.reduce((result, config) => {
      return {
        ...result, ...config,
        messages: { ...result.messages, ...config.messages },
        libraryName
      };
    }, defaultConfig);
  }

  private getLibraryConfigs(configs: DynamicFormValidationConfigs) {
    const libraryNamesReverse = [ ...this.libraryNames ].reverse();
    return libraryNamesReverse
      .map(name => configs.find(config => config.libraryName === name))
      .filter(config => !!config);
  }
}
