import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { bsDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';
import { bsDynamicFormWrapperConfig } from './dynamic-form-wrapper/dynamic-form-wrapper.config';

export const bsDynamicFormConfig: DynamicFormConfig = {
  library: 'bootstrap',
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: bsDynamicFormInputConfig,
  wrapperConfig: bsDynamicFormWrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
