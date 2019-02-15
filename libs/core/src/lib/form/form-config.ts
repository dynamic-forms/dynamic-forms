import { InjectionToken } from '@angular/core';
import { FormControlConfig } from './../form-control/form-control-config';
import { FormFieldConfig } from './../form-field/form-field-config';
import { FormValidationConfig } from './../form-validation/form-validation-config';

export interface FormConfig {
  module: string;
  fieldConfig?: FormFieldConfig;
  controlConfig?: FormControlConfig;
  validationConfig?: FormValidationConfig;
}

export const FORM_CONFIG = new InjectionToken<FormConfig>('FormConfig');
