import { Inject, Injectable } from '@angular/core';
import { FormControlType } from './../dynamic-form-control/form-control-type';
import { FormFieldWrapperType } from './../dynamic-form-field-wrapper/form-field-wrapper-type';
import { FormFieldType } from './../dynamic-form-field/form-field-type';
import { DynamicFormConfig, DYNAMIC_FORM_CONFIG } from './dynamic-form-config';

@Injectable()
export class DynamicFormConfigService {
  constructor(@Inject(DYNAMIC_FORM_CONFIG) private formConfig: DynamicFormConfig) {}

  getFieldConfig(type: FormFieldType) {
    const config = this.formConfig.fieldConfig;
    return config.types.find(f => f.type === type);
  }

  getWrapperConfig(type: FormFieldWrapperType) {
    const config = this.formConfig.wrapperConfig;
    return config.types.find(f => f.type === type);
  }

  getControlConfig(type: FormControlType) {
    const config = this.formConfig.controlConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }

  getValidationConfig() {
    return this.formConfig.validationConfig;
  }
}
