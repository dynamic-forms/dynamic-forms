import { DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const bsDynamicFormRadioType: DynamicFormInputType = {
  type: 'radio',
  component: BsDynamicFormRadioComponent,
  wrappers: ['label', 'errors'],
  libraryName: bsDynamicFormLibrary.name,
};
