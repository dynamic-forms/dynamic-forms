import { Inject, Injectable } from '@angular/core';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  constructor(@Inject(DYNAMIC_FORM_CONFIG) public config: DynamicFormConfig) {}

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
}
