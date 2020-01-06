import { Inject, Injectable } from '@angular/core';
import { DynamicFormConfig, DynamicFormLibrary, DYNAMIC_FORM_CONFIG, DYNAMIC_FORM_LIBRARY } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  readonly config: DynamicFormConfig;

  constructor(
    @Inject(DYNAMIC_FORM_LIBRARY) private library: DynamicFormLibrary,
    @Inject(DYNAMIC_FORM_CONFIG) private configs: DynamicFormConfig[],
  ) {
    this.config = this.getConfig(this.library, this.configs);
  }

  getElementTypeConfig(type: string) {
    const config = this.config.elementConfig;
    return config.types.find(f => f.type === type);
  }

  getFieldTypeConfig(type: string) {
    const config = this.config.fieldConfig;
    return config.types.find(f => f.type === type);
  }

  getInputTypeConfig(type: string) {
    const config = this.config.inputConfig;
    return config.types.find(f => f.type === type);
  }

  getWrapperTypeConfig(type: string) {
    const config = this.config.wrapperConfig;
    return config.types.find(f => f.type === type);
  }

  getValidationConfig() {
    return this.config.validationConfig;
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
    if (result.elementConfig || config.elementConfig) {
      result.elementConfig = this.merge(result.elementConfig, config.elementConfig);
    }
    if (result.fieldConfig || config.fieldConfig) {
      result.fieldConfig = this.merge(result.fieldConfig, config.fieldConfig);
    }
    if (result.inputConfig || config.inputConfig) {
      result.inputConfig = this.merge(result.inputConfig, config.inputConfig);
    }
    if (result.wrapperConfig || config.wrapperConfig) {
      result.wrapperConfig = this.merge(result.wrapperConfig, config.wrapperConfig);
    }
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
