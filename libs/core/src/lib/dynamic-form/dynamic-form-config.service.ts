import { Inject, Injectable } from '@angular/core';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  constructor(@Inject(DYNAMIC_FORM_CONFIG) public config: DynamicFormConfig) {}

  getWrapperTypeConfig(type: DynamicFormWrapperType) {
    const config = this.config.wrapperConfig;
    return config.types.find(f => f.type === type);
  }

  getFieldTypeConfig(type: DynamicFormFieldType) {
    const config = this.config.fieldConfig;
    return config.types.find(f => f.type === type);
  }

  getInputTypeConfig(type: DynamicFormInputType) {
    const config = this.config.inputConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }

  getValidationConfig() {
    return this.config.validationConfig;
  }
}
