import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-type';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-type';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormValidationConfig, DynamicFormValidationConfigs, DYNAMIC_FORM_VALIDATION_CONFIGS } from '../dynamic-form-validation/dynamic-form-validation-config';
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

  private filterTypes<Type extends { library: DynamicFormLibrary, type: string }>(types: Type[]): Type[] {
    if (!types || !types.length) {
      return [];
    }

    const libraryTypes = types.filter(type => type.library === this.library);
    const libraryTypeNames = libraryTypes.map(type => type.type);
    const coreTypes = types.filter(type => type.library === 'core' && !libraryTypeNames.includes(type.type));
    return [ ...coreTypes, ...libraryTypes ];
  }

  private mergeValidationConfigs(configs: DynamicFormValidationConfigs): DynamicFormValidationConfig {
    const defaultConfig = { defaultMessage: undefined, messages: {}, library: this.library };
    if (!configs || !configs.length) {
      return defaultConfig;
    }

    const coreConfigs = configs.filter(config => config.library === dynamicFormLibrary);
    const libraryConfigs = configs.filter(config => config.library === this.library);
    return coreConfigs.concat(libraryConfigs).reduce((result, config) => {
      return {
        ...result, ...config,
        messages: { ...result.messages, ...config.messages },
        library: this.library
      };
    }, defaultConfig);
  }
}
