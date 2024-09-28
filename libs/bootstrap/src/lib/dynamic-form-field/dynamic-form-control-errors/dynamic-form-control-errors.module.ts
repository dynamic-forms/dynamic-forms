import { DynamicFormFieldWrapperType, DynamicFormsFeature, withDynamicFormFieldWrappers } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormControlErrorsComponent } from './dynamic-form-control-errors.component';

export const bsDynamicFormControlErrorsType: DynamicFormFieldWrapperType = {
  type: 'errors',
  component: BsDynamicFormControlErrorsComponent,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormControlErrors(): DynamicFormsFeature {
  return withDynamicFormFieldWrappers(bsDynamicFormControlErrorsType);
}
