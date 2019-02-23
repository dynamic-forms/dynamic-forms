import { Inject, Injectable } from '@angular/core';
import { FormControlType } from './../form-control/form-control-type';
import { FormFieldWrapperType } from './../form-field-wrapper/form-field-wrapper-type';
import { FormFieldType } from './../form-field/form-field-type';
import { FormConfig, FORM_CONFIG } from './form-config';

@Injectable()
export class FormConfigService {
  constructor(@Inject(FORM_CONFIG) private formConfig: FormConfig) {
    console.log('formConfig:', this.formConfig);
  }

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
