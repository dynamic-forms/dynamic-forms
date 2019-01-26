import { InjectionToken } from '@angular/core';
import { FormFieldConfig } from '../form-field/form-field.config';
import { FormControlConfig } from '../form-control/form-control.config';
import { FormValidationConfig } from '../form-validation/form-validation.config';

export const FORM_CONFIG = new InjectionToken<FormConfig>('FormConfig');

export interface FormConfig {
  fieldConfig: FormFieldConfig;
  controlConfig: FormControlConfig;
  validationConfig: FormValidationConfig;
}
