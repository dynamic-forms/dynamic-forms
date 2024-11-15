import { DynamicFormFieldWrapperType, DynamicFormsFeature, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlHintsComponent } from './dynamic-form-control-hints.component';

export const bsDynamicFormControlHintsType: DynamicFormFieldWrapperType = {
  type: 'hints',
  component: BsDynamicFormControlHintsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormControlHints(): DynamicFormsFeature {
  return withDynamicFormFieldWrappers(bsDynamicFormControlHintsType);
}
