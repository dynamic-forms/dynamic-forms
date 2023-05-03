import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const matDynamicFormRadioType: DynamicFormInputType = {
  type: 'radio',
  component: MatDynamicFormRadioComponent,
  libraryName: matDynamicFormLibrary.name,
};
