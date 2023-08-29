import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormSwitchComponent } from './dynamic-form-switch.component';

export const matDynamicFormSwitchType: DynamicFormInputType = {
  type: 'switch',
  component: MatDynamicFormSwitchComponent,
  libraryName: matDynamicFormLibrary.name,
};
