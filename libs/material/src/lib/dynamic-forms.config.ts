import { dynamicFormConfig, DynamicFormConfig, DynamicFormConfigService } from '@dynamic-forms/core';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  ...dynamicFormConfig,
  inputConfig: matDynamicFormInputConfig,
  module: 'material'
};

export function matDynamicFormConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === matDynamicFormConfig.module);
  return new DynamicFormConfigService(config);
}
