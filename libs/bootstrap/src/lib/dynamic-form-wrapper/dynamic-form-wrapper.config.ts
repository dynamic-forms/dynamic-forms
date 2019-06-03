import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'label', component: BsDynamicFormControlLabelComponent }
  ]
};
