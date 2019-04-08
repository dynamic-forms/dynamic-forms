import { DynamicFormArrayComponent, DynamicFormConfig, DynamicFormConfigService, DynamicFormGroupComponent } from '@dynamic-forms/core';
import { DynamicFormControlBootstrapComponent } from './dynamic-form-control/dynamic-form-control.component';
import { bsDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';
import { bsDynamicFormWrapperConfig } from './dynamic-form-wrapper/dynamic-form-wrapper.config';

export const bsDynamicFormConfig: DynamicFormConfig = {
  module: 'bootstrap',
  wrapperConfig: bsDynamicFormWrapperConfig,
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: DynamicFormControlBootstrapComponent }
    ]
  },
  inputConfig: bsDynamicFormInputConfig,
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

export function bsDynamicFormConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === bsDynamicFormConfig.module);
  return new DynamicFormConfigService(config);
}
