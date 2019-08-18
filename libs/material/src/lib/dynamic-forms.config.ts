import { dynamicFormConfig, DynamicFormConfig } from '@dynamic-forms/core';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  ...dynamicFormConfig,
  library: 'material',
  inputConfig: matDynamicFormInputConfig
};
