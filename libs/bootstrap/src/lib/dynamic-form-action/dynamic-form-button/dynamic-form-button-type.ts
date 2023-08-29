import { DynamicFormActionType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormButtonComponent } from './dynamic-form-button.component';

export const bsDynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: BsDynamicFormButtonComponent,
  libraryName: bsDynamicFormLibrary.name,
};
