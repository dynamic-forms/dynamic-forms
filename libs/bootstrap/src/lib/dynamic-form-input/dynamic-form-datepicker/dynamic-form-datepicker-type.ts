import { DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerType: DynamicFormInputType = {
  type: 'datepicker',
  component: BsDynamicFormDatepickerComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

