import { DynamicFormInputType } from '@dynamic-forms/core';
import { DynamicFormInputMaskControl } from '@dynamic-forms/core/input-mask';
import { matDynamicFormLibrary } from '@dynamic-forms/material';
import { MatDynamicFormInputMaskComponent } from './dynamic-form-input-mask.component';

export const matDynamicFormInputMaskType: DynamicFormInputType = {
  type: 'input-mask',
  component: MatDynamicFormInputMaskComponent,
  control: DynamicFormInputMaskControl,
  libraryName: matDynamicFormLibrary.name,
};
