import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';

export const matDynamicFormConfig: DynamicFormConfig = {
  library: 'material',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: dynamicFormConfig.inputConfig,
  wrapperConfig: dynamicFormConfig.wrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
