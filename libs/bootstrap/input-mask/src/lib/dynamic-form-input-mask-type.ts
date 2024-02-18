import { bsDynamicFormLibrary } from '@dynamic-forms/bootstrap';
import { DynamicFormInputType } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl } from '@dynamic-forms/core/input-mask';
import { BsDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const bsDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: BsDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: bsDynamicFormLibrary.name,
};
