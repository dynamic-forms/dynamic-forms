import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { bsDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';
import { bsDynamicFormFieldWrapperConfig } from './dynamic-form-wrapper/dynamic-form-field-wrapper.config';

export const bsDynamicFormConfig: DynamicFormConfig = {
  library: 'bootstrap',
  elementConfig: dynamicFormConfig.elementConfig,
  fieldConfig: dynamicFormConfig.fieldConfig,
  inputConfig: bsDynamicFormInputConfig,
  wrapperConfig: bsDynamicFormFieldWrapperConfig,
  validationConfig: dynamicFormConfig.validationConfig
};
