import { DynamicFormWrapperConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormWrapperConfig: DynamicFormWrapperConfig = {
  types: [
    { type: 'label', component: BsDynamicFormControlLabelComponent },
    { type: 'hints', component: BsDynamicFormControlHintsComponent }
  ]
};
