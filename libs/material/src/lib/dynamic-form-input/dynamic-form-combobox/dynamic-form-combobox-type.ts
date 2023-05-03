import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormComboboxComponent } from './dynamic-form-combobox.component';

export const matDynamicFormComboboxType: DynamicFormInputType = {
  type: 'combobox',
  component: MatDynamicFormComboboxComponent,
  libraryName: matDynamicFormLibrary.name,
};
