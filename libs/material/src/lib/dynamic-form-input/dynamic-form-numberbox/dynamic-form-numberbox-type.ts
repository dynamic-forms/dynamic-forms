import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const matDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: MatDynamicFormNumberboxComponent,
  libraryName: matDynamicFormLibrary.name,
};
