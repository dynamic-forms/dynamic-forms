import { InjectionToken } from '@angular/core';
import { DynamicFormElementConfig } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapperConfig } from '../dynamic-form-field/dynamic-form-field-wrapper-config';
import { DynamicFormInputConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';

export interface DynamicFormConfig {
  library: string;
  elementConfig?: DynamicFormElementConfig;
  fieldConfig?: DynamicFormFieldConfig;
  inputConfig?: DynamicFormInputConfig;
  wrapperConfig?: DynamicFormFieldWrapperConfig;
  validationConfig?: DynamicFormValidationConfig;
}

export const DYNAMIC_FORM_LIBRARY = new InjectionToken<string>('DynamicFormLibrary');
export const DYNAMIC_FORM_CONFIG = new InjectionToken<DynamicFormConfig>('DynamicFormConfig');
