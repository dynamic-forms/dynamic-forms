import { InjectionToken } from '@angular/core';
import { FormFieldWrapperConfig } from '../dynamic-form-field-wrapper/form-field-wrapper-config';
import { FormControlConfig } from './../dynamic-form-control/form-control-config';
import { FormFieldConfig } from './../dynamic-form-field/form-field-config';
import { FormValidationConfig } from './../dynamic-form-validation/form-validation-config';

export interface DynamicFormConfig {
  module: string;
  fieldConfig?: FormFieldConfig;
  wrapperConfig?: FormFieldWrapperConfig;
  controlConfig?: FormControlConfig;
  validationConfig?: FormValidationConfig;
}

export const DYNAMIC_FORM_CONFIG = new InjectionToken<DynamicFormConfig>('DynamicFormConfig');
