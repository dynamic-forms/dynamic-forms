import { dynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { DynamicFormElementType } from '../dynamic-form-element-type';
import { DynamicFormContainerComponent } from './dynamic-form-container.component';

export const dynamicFormContainerType: DynamicFormElementType = {
  type: 'container',
  component: DynamicFormContainerComponent,
  libraryName: dynamicFormLibrary.name,
};
