import { dynamicFormConfig, DynamicFormConfig, DynamicFormConfigService } from '@dynamic-forms/core';
import { bsDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';
import { bsDynamicFormWrapperConfig } from './dynamic-form-wrapper/dynamic-form-wrapper.config';

export const bsDynamicFormConfig: DynamicFormConfig = {
  ...dynamicFormConfig,
  wrapperConfig: bsDynamicFormWrapperConfig,
  inputConfig: bsDynamicFormInputConfig,
  module: 'bootstrap'
};

export function bsDynamicFormConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === bsDynamicFormConfig.module);
  return new DynamicFormConfigService(config);
}
