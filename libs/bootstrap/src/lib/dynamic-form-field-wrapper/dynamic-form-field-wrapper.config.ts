import { DynamicFormFieldWrapperConfig } from '@dynamic-forms/core';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors/dynamic-form-control-errors.component';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints/dynamic-form-control-hints.component';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label/dynamic-form-control-label.component';

export const bsDynamicFormFieldWrapperConfig: DynamicFormFieldWrapperConfig = {
  types: [
    { type: 'errors', component: BsDynamicFormControlErrorsComponent },
    { type: 'hints', component: BsDynamicFormControlHintsComponent },
    { type: 'label', component: BsDynamicFormControlLabelComponent }
  ]
};
