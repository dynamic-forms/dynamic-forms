import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { DynamicLabelWrapperBootstrapComponent } from './dynamic-label-wrapper/dynamic-label-wrapper.component';

export const bsDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'label', component: DynamicLabelWrapperBootstrapComponent }
  ]
};
