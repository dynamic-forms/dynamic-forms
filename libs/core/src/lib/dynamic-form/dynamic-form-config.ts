import { InjectionToken } from '@angular/core';
import { DynamicFormFieldConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormInputConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormWrapperConfig } from '../dynamic-form-wrapper/dynamic-form-wrapper-config';

export interface DynamicFormConfig {
  library: string;
  fieldConfig?: DynamicFormFieldConfig;
  inputConfig?: DynamicFormInputConfig;
  wrapperConfig?: DynamicFormWrapperConfig;
  validationConfig?: DynamicFormValidationConfig;
}

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<string>('DynamicFormLibrary');
export const DYNAMIC_FORM_CONFIG = new InjectionToken<DynamicFormConfig>('DynamicFormConfig');
