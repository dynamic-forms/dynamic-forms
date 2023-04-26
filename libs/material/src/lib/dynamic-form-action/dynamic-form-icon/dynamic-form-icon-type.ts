import { DynamicFormActionType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormIconComponent } from './dynamic-form-icon.component';

export const matDynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: MatDynamicFormIconComponent,
  libraryName: matDynamicFormLibrary.name,
};
