import { Inject, Injectable } from '@angular/core';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  constructor(@Inject(DYNAMIC_FORM_CONFIG) private formConfig: DynamicFormConfig) {}

  getWrapperConfig(type: DynamicFormWrapperType) {
    const config = this.formConfig.wrapperConfig;
    return config.types.find(f => f.type === type);
  }

  getFieldConfig(type: DynamicFormFieldType) {
    const config = this.formConfig.fieldConfig;
    return config.types.find(f => f.type === type);
  }

  getInputConfig(type: DynamicFormInputType) {
    const config = this.formConfig.inputConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }

  getValidationConfig() {
    return this.formConfig.validationConfig;
  }
}
