import { DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormFileComponent } from './dynamic-form-file.component';

export const matDynamicFormFileType: DynamicFormInputType = {
  type: 'file',
  component: MatDynamicFormFileComponent,
  libraryName: matDynamicFormLibrary.name,
};
