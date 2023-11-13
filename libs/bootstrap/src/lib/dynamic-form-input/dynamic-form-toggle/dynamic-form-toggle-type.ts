import { DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormToggleComponent } from './dynamic-form-toggle.component';

export const bsDynamicFormToggleType: DynamicFormInputType = {
  type: 'toggle',
  component: BsDynamicFormToggleComponent,
  wrappers: ['label', 'errors'],
  libraryName: bsDynamicFormLibrary.name,
};
