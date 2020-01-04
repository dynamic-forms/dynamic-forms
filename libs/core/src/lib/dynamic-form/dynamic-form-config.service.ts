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
      if (config.library === 'core' || config.library === library) {
        return this.mergeConfigs(library, result, config);
      }
      return result;
    }, <DynamicFormConfig>{});
  }

  private mergeConfigs(library: DynamicFormLibrary, config1: DynamicFormConfig, config2: DynamicFormConfig) {
    return {
      library: library,
      elementConfig: this.merge(config1.elementConfig, config2.elementConfig),
      fieldConfig: this.merge(config1.fieldConfig, config2.fieldConfig),
      inputConfig: this.merge(config1.inputConfig, config2.inputConfig),
      wrapperConfig: this.merge(config1.wrapperConfig, config2.wrapperConfig),
      validationConfig: { ...config1.validationConfig, ...config2.validationConfig }
    };
  }

  private merge<Config extends { types: { type: string }[] }>(config1: Config, config2: Config) {
    if (config1 && config2) {
      return {
        ...config1, ...config2,
        types: this.mergeTypeConfigs(config1.types, config2.types)
      };
    }
    return config1 || config2;
  }

  private mergeTypeConfigs<TypeConfig extends { type: string }>(typeConfigs1: TypeConfig[], typeConfigs2: TypeConfig[]) {
    if (typeConfigs1 && typeConfigs2) {
      const types = typeConfigs2.map(typeConfig => typeConfig.type);
      return [
        ...typeConfigs1.filter(typeConfig => !types.includes(typeConfig.type)),
        ...typeConfigs2
      ];
    }
    return typeConfigs1 || typeConfigs2;
  }
}
