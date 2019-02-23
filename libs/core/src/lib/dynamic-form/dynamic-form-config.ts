import { InjectionToken } from '@angular/core';
import { DynamicFormControlConfig } from '../dynamic-form-control/dynamic-form-control-config';
import { DynamicFormFieldWrapperConfig } from '../dynamic-form-field-wrapper/dynamic-form-field-wrapper-config';
import { DynamicFormFieldConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';

export interface DynamicFormConfig {
  module: string;
  fieldConfig?: DynamicFormFieldConfig;
  wrapperConfig?: DynamicFormFieldWrapperConfig;
  controlConfig?: DynamicFormControlConfig;
  validationConfig?: DynamicFormValidationConfig;
}

export const DYNAMIC_FORM_CONFIG = new InjectionToken<DynamicFormConfig>('DynamicFormConfig');
