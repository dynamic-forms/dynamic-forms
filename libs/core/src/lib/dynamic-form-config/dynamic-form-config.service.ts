import { Inject, Injectable, Optional } from '@angular/core';
import { DynamicFormElementTypes, DYNAMIC_FORM_ELEMENT_TYPES } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldTypes, DYNAMIC_FORM_FIELD_TYPES } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapperTypes, DYNAMIC_FORM_FIELD_WRAPPER_TYPES } from '../dynamic-form-field/dynamic-form-field-wrapper-config';
import { DynamicFormInputTypes, DYNAMIC_FORM_INPUT_TYPES } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormConfig, DynamicFormConfigs, DYNAMIC_FORM_CONFIGS } from './dynamic-form-config';
import { DynamicFormLibrary, DYNAMIC_FORM_LIBRARY } from './dynamic-form-library';

@Injectable()
export class DynamicFormConfigService {
  readonly config: DynamicFormConfig;
  readonly elementTypes: DynamicFormElementTypes;
  readonly fieldTypes: DynamicFormFieldTypes;
  readonly inputTypes: DynamicFormInputTypes;
  readonly fieldWrapperTypes: DynamicFormFieldWrapperTypes;

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY) private library: DynamicFormLibrary,
    @Inject(DYNAMIC_FORM_CONFIGS) private configs: DynamicFormConfigs,
    @Optional() @Inject(DYNAMIC_FORM_ELEMENT_TYPES) private _elementTypes: DynamicFormElementTypes,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_TYPES) private _fieldTypes: DynamicFormFieldTypes,
    @Optional() @Inject(DYNAMIC_FORM_INPUT_TYPES) private _inputTypes: DynamicFormInputTypes,
    @Optional() @Inject(DYNAMIC_FORM_FIELD_WRAPPER_TYPES) private _fieldWrapperTypes: DynamicFormFieldWrapperTypes
  ) {
    this.config = this.getConfig(this.library, this.configs);
    this.elementTypes = this.filterTypes(this._elementTypes || [], this.library);
    this.fieldTypes = this.filterTypes(this._fieldTypes || [], this.library);
    this.inputTypes = this.filterTypes(this._inputTypes || [], this.library);
    this.fieldWrapperTypes = this.filterTypes(this._fieldWrapperTypes || [], this.library);
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
    return this.config.validationConfig;
  }

  private filterTypes<Type extends { library?: DynamicFormLibrary, type: string }>(types: Type[], library: string): Type[] {
    const libraryTypes = types.filter(type => type.library === library);
    const libraryTypeNames = libraryTypes.map(type => type.type);
    const coreTypes = types.filter(type => type.library === 'core' && !libraryTypeNames.includes(type.type));
    return [ ...coreTypes, ...libraryTypes ];
  }

  private getConfig(library: DynamicFormLibrary, configs: DynamicFormConfig[]) {
    return configs.reduce((result, config) => {
      if (config.library === library || config.library === 'core') {
        this.extendConfig(result, config);
        return result;
      }
      return result;
    }, <DynamicFormConfig>{ library });
  }

  private extendConfig(result: DynamicFormConfig, config: DynamicFormConfig) {
    if (result.validationConfig || config.validationConfig) {
      result.validationConfig = { ...result.validationConfig, ...config.validationConfig };
    }
  }

  private merge<Config extends { types: { type: string }[] }>(config1: Config, config2: Config) {
    if (config1 && config2) {
      return {
        ...config1, ...config2,
        types: this.mergeTypes(config1.types, config2.types)
      };
    }
    return config1 || config2;
  }

  private mergeTypes<TypeConfig extends { type: string }>(types1: TypeConfig[], types2: TypeConfig[]) {
    if (types1 && types2) {
      const types = types2.map(typeConfig => typeConfig.type);
      return [
        ...types1.filter(typeConfig => !types.includes(typeConfig.type)),
        ...types2
      ];
    }
    return types1 || types2;
  }
}
