import { DynamicFormFieldWrapperType, DynamicFormsFeature, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlLabelComponent } from './dynamic-form-control-label.component';

export const bsDynamicFormControlLabelType: DynamicFormFieldWrapperType = {
  type: 'label',
  component: BsDynamicFormControlLabelComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormControlLabel(): DynamicFormsFeature {
  return withDynamicFormFieldWrappers(bsDynamicFormControlLabelType);
}
