import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfig, DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormConfigService {
  readonly validationConfig: DynamicFormValidationConfig;
  readonly elementTypes: DynamicFormElementTypes;
  readonly fieldTypes: DynamicFormFieldTypes;
  readonly inputTypes: DynamicFormInputTypes;
  readonly fieldWrapperTypes: DynamicFormFieldWrapperTypes;

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY) private library: DynamicFormLibrary,
    @Optional() @Inject(DYNAMIC_FORM_VALIDATION_CONFIGS) private _validationConfigs: DynamicFormValidationConfigs = null,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPES) private _elementTypes: DynamicFormElementTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPES) private _fieldTypes: DynamicFormFieldTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPES) private _inputTypes: DynamicFormInputTypes = null,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES) private _fieldWrapperTypes: DynamicFormFieldWrapperTypes = null
  ) {
    this.validationConfig = this.mergeConfigs(this._validationConfigs, this.library);
    this.elementTypes = this.filterTypes(this._elementTypes, this.library);
    this.fieldTypes = this.filterTypes(this._fieldTypes, this.library);
    this.inputTypes = this.filterTypes(this._inputTypes, this.library);
    this.fieldWrapperTypes = this.filterTypes(this._fieldWrapperTypes, this.library);
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

  getValidationConfig() {
    return this.validationConfig;
  }

  private mergeConfigs<Config extends { library: DynamicFormLibrary }>(configs: Config[], library: DynamicFormLibrary): Config {
    if (!configs || !configs.length) {
      return undefined;
    }

    if (configs.length === 1) {
      return configs[0];
    }

    const coreConfigs = configs.filter(config => config.library === 'core');
    const libraryConfigs = configs.filter(config => config.library === library);
    return coreConfigs.concat(libraryConfigs).reduce((result, config) => {
      return { ...result, ...config };
    }, { library } as Config);
  }

  private filterTypes<Type extends { library: DynamicFormLibrary, type: string }>(types: Type[], library: DynamicFormLibrary): Type[] {
    if (!types || !types.length) {
      return [];
    }

    const libraryTypes = types.filter(type => type.library === library);
    const libraryTypeNames = libraryTypes.map(type => type.type);
    const coreTypes = types.filter(type => type.library === 'core' && !libraryTypeNames.includes(type.type));
    return [ ...coreTypes, ...libraryTypes ];
  }
}
