import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { bsDynamicFormFieldWrapperConfig } from './dynamic-form-field-wrapper/dynamic-form-field-wrapper.config';
import { bsDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const bsDynamicFormConfig: DynamicFormConfig = {
  library: 'bootstrap',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: bsDynamicFormInputConfig,
  wrapperConfig: bsDynamicFormFieldWrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
