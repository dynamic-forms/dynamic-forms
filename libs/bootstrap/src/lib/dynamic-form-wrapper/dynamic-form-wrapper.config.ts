import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { DynamicFormLabelWrapperBootstrapComponent } from './dynamic-form-label-wrapper.component';

export const bsDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'label', component: DynamicFormLabelWrapperBootstrapComponent }
  ]
};
