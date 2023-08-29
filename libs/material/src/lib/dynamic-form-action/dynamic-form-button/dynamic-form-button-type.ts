import { DynamicFormActionType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormButtonComponent } from './dynamic-form-button.component';

export const matDynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: MatDynamicFormButtonComponent,
  libraryName: matDynamicFormLibrary.name,
};
