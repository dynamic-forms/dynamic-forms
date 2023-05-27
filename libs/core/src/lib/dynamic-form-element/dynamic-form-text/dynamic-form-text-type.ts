import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormTextComponent } from './dynamic-form-text.component';

export const dynamicFormTextType: DynamicFormElementType = {
  type: 'text',
  component: DynamicFormTextComponent,
  libraryName: dynamicFormLibrary.name,
};
