import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormSelectComponent } from './dynamic-form-select.component';

export const matDynamicFormSelectType: DynamicFormInputType = {
  type: 'select',
  component: MatDynamicFormSelectComponent,
  libraryName: matDynamicFormLibrary.name,
};
