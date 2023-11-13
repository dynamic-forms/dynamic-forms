import { DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: BsDynamicFormNumberboxComponent,
  wrappers: ['hints', 'errors'],
  libraryName: bsDynamicFormLibrary.name,
};
