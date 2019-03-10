import { DynamicFormArrayComponent, DynamicFormConfig, DynamicFormConfigService, DynamicFormGroupComponent } from '@dynamic-forms/core';
import { MatDynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { matDynamicFormInputConfig } from './dynamic-form-input/dynamic-form-input.config';

export const matDynamicFormConfig: DynamicFormConfig = {
  module: 'material',
  wrapperConfig: {
    types: []
  },
  fieldConfig: {
    types: [
      { type: 'group', component: DynamicFormGroupComponent },
      { type: 'array', component: DynamicFormArrayComponent },
      { type: 'control', component: MatDynamicFormControlComponent }
    ]
  },
  inputConfig: matDynamicFormInputConfig,
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

export function matDynamicFormConfigFactory(configs: DynamicFormConfig[]): DynamicFormConfigService {
  const config = configs.find(c => c.module === matDynamicFormConfig.module);
  return new DynamicFormConfigService(config);
}
