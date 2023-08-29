import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormContentComponent } from './dynamic-form-content.component';

export const dynamicFormContentType: DynamicFormElementType = {
  type: 'content',
  component: DynamicFormContentComponent,
  libraryName: dynamicFormLibrary.name,
};
