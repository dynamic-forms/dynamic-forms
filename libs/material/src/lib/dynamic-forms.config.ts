import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  library: 'material',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: matDynamicFormInputConfig,
  wrapperConfig: dynamicFormConfig.wrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
