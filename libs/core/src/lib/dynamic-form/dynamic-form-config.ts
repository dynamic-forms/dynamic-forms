import { InjectionToken } from '@angular/core';
import { DynamicFormFieldConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormInputConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormWrapperConfig } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';

export interface DynamicFormConfig {
  module: string;
  wrapperConfig?: DynamicFormWrapperConfig;
  fieldConfig?: DynamicFormFieldConfig;
  inputConfig?: DynamicFormInputConfig;
  validationConfig?: DynamicFormValidationConfig;
}

export const DYNAMIC_FORM_CONFIG = new InjectionToken<DynamicFormConfig>('DynamicFormConfig');
