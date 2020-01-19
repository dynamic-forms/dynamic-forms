import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfig, DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormComponentType } from './dynamic-form-component-type';
import { dynamicFormLibrary, DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormConfigService {
  readonly elementTypes: DynamicFormElementTypes;
  readonly fieldTypes: DynamicFormFieldTypes;
  readonly inputTypes: DynamicFormInputTypes;
  readonly fieldWrapperTypes: DynamicFormFieldWrapperTypes;
  readonly validationConfig: DynamicFormValidationConfig;

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY) readonly library: DynamicFormLibrary,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPES) private _elementTypes: DynamicFormElementTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPES) private _fieldTypes: DynamicFormFieldTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPES) private _inputTypes: DynamicFormInputTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES) private _fieldWrapperTypes: DynamicFormFieldWrapperTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_VALIDATION_CONFIGS) private _validationConfigs: DynamicFormValidationConfigs = null
  ) {
    this.elementTypes = this.filterTypes(this._elementTypes);
    this.fieldTypes = this.filterTypes(this._fieldTypes);
    this.inputTypes = this.filterTypes(this._inputTypes);
    this.fieldWrapperTypes = this.filterTypes(this._fieldWrapperTypes);
    this.validationConfig = this.mergeValidationConfigs(this._validationConfigs);
  }

  getElementType(type: string) {
    return this.elementTypes.find(f => f.type === type);
  }

  getFieldType(type: string) {
    return this.fieldTypes.find(f => f.type === type);
  }

  getInputType(type: string) {
    return this.inputTypes.find(f => f.type === type);
  }

  getFieldWrapperType(type: string) {
    return this.fieldWrapperTypes.find(f => f.type === type);
  }

  private filterTypes<Component>(types: DynamicFormComponentType<Component>[]): DynamicFormComponentType<Component>[] {
    if (!types || !types.length) {
      return [];
    }

    const libraryTypes = this.getLibraryTypes(this.library, types);
    const coreTypes = this.getLibraryTypes(dynamicFormLibrary, types, libraryTypes);
    return [ ...coreTypes, ...libraryTypes ];
  }

  private getLibraryTypes<Component>(
    library: DynamicFormLibrary,
    types: DynamicFormComponentType<Component>[],
    excludeTypes: DynamicFormComponentType<Component>[] = []
  ): DynamicFormComponentType<Component>[] {
    if (excludeTypes && excludeTypes.length) {
      const excludeTypeNames = excludeTypes.map(type => type.type);
      return types.filter(type => type.libraryName === library.name && !excludeTypeNames.includes(type.type));
    }
    return types.filter(type => type.libraryName === library.name);
  }

  private mergeValidationConfigs(configs: DynamicFormValidationConfigs): DynamicFormValidationConfig {
    const libraryName = this.library.name;
    const defaultConfig = { defaultMessage: undefined, messages: {}, libraryName };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const coreConfigs = configs.filter(config => config.libraryName === dynamicFormLibrary.name);
    const libraryConfigs = configs.filter(config => config.libraryName === this.library.name);
    return coreConfigs.concat(libraryConfigs).reduce((result, config) => {
      return {
        ...result, ...config,
        messages: { ...result.messages, ...config.messages },
        libraryName
      };
    }, defaultConfig);
  }
}
