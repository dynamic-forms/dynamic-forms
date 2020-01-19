import { Type } from '@angular/core';
import { DynamicFormLibraryName } from './dynamic-form-library';

export interface DynamicFormComponentType<Component> {
  type: string;
  component: Type<Component>;
  libraryName: DynamicFormLibraryName;
}
