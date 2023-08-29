import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const matDynamicFormTextareaType: DynamicFormInputType = {
  type: 'textarea',
  component: MatDynamicFormTextareaComponent,
  libraryName: matDynamicFormLibrary.name,
};
