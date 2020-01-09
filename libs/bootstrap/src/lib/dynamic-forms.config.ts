import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';

export const bsDynamicFormConfig: DynamicFormConfig = {
  library: 'bootstrap',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: dynamicFormConfig.inputConfig,
  wrapperConfig: dynamicFormConfig.wrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
