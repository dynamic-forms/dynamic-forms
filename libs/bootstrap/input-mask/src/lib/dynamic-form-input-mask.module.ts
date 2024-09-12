import { bsDynamicFormLibrary } from '@dynamic-forms/bootstrap';
import { DynamicFormInputType, DynamicFormsFeature, mergeDynamicFormsFeatures, withDynamicFormInputs } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl, withDynamicFormInputMaskConverterService } from '@dynamic-forms/core/input-mask';
import { BsDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const bsDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: BsDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: bsDynamicFormLibrary.name,
};

export function withBsDynamicFormInputMask(): DynamicFormsFeature {
  return mergeDynamicFormsFeatures(withDynamicFormInputs(bsDynamicFormInputMaskType), withDynamicFormInputMaskConverterService());
}
