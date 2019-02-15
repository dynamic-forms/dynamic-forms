import { Inject, Injectable } from '@angular/core';
import { FormControlType } from '../form-control/form-control-type';
import { FormFieldType } from '../form-field/form-field-type';
import { FormConfig, FORM_CONFIG } from './form-config';

@Injectable()
export class FormConfigService {
  constructor(@Inject(FORM_CONFIG) private formConfig: FormConfig) {
    console.log('formConfig:', this.formConfig);
  }

  getFieldConfig(type: FormFieldType) {
    const fieldConfig = this.formConfig.fieldConfig;
    return fieldConfig.types.find(f => f.type === type);
  }

  getControlConfig(type: FormControlType) {
    const config = this.formConfig.controlConfig;
    return config.types.find(f => f.type === type) || config.defaultType;
  }

  getValidationConfig() {
    return this.formConfig.validationConfig;
  }
}
