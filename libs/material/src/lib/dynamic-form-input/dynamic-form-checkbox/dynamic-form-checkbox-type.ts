import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const matDynamicFormCheckboxType: DynamicFormInputType = {
  type: 'checkbox',
  component: MatDynamicFormCheckboxComponent,
  libraryName: matDynamicFormLibrary.name,
};
