import { DynamicFormActionType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormIconComponent } from './dynamic-form-icon.component';

export const bsDynamicFormIconType: DynamicFormActionType = {
  type: 'icon',
  component: BsDynamicFormIconComponent,
  libraryName: bsDynamicFormLibrary.name,
};
