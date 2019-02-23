import { Inject, Injectable } from '@angular/core';
import { DynamicFormControlType } from '../dynamic-form-control/dynamic-form-control-type';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field-wrapper/dynamic-form-field-wrapper-type';
import { DynamicFormFieldType } from '../dynamic-form-field/dynamic-form-field-type';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  constructor(@Inject(DYNAMIC_FORM_CONFIG) private formConfig: DynamicFormConfig) {}

  getFieldConfig(type: DynamicFormFieldType) {
    const config = this.formConfig.fieldConfig;
    return config.types.find(f => f.type === type);
  }

  getWrapperConfig(type: DynamicFormFieldWrapperType) {
    const config = this.formConfig.wrapperConfig;
    return config.types.find(f => f.type === type);
  }

  getControlConfig(type: DynamicFormControlType) {
    const config = this.formConfig.controlConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }

  getValidationConfig() {
    return this.formConfig.validationConfig;
  }
}
