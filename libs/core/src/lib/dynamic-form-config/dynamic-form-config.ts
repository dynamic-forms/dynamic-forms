import { InjectionToken } from '@angular/core';
import { DynamicFormElementConfig } from '../dynamic-form-element/dynamic-form-element-config';
import { DynamicFormFieldConfig } from '../dynamic-form-field/dynamic-form-field-config';
import { DynamicFormFieldWrapperConfig } from '../dynamic-form-field/dynamic-form-field-wrapper-config';
import { DynamicFormInputConfig } from '../dynamic-form-input/dynamic-form-input-config';
import { DynamicFormValidationConfig } from '../dynamic-form-validation/dynamic-form-validation-config';
import { DynamicFormLibrary } from './dynamic-form-library';

export interface DynamicFormConfig {
  library: DynamicFormLibrary;
  elementConfig?: DynamicFormElementConfig;
  fieldConfig?: DynamicFormFieldConfig;
  inputConfig?: DynamicFormInputConfig;
  wrapperConfig?: DynamicFormFieldWrapperConfig;
  validationConfig?: DynamicFormValidationConfig;
}

export type DynamicFormConfigs = DynamicFormConfig[];

export const DYNAMIC_FORM_CONFIGS = new InjectionToken<DynamicFormConfigs>('DynamicFormConfigs');

export const dynamicFormConfig: DynamicFormConfig = {
  library: 'core',
  validationConfig: {
    defaultMessage: 'The field is invalid.',
    messages: {
      required: 'The field is required.',
      email: 'The field is not an email.',
      pattern: 'The field does not fit the pattern.',
      min: 'The field does not fit the min value',
      max: 'The field does not fit the max value',
      minlength: 'The field does not fit the min length',
      maxlength: 'The field does not fit the max length'
    }
  }
};
