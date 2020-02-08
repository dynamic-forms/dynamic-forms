import { Type } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormLibraryName } from './dynamic-form-library';

export interface DynamicFormComponentType<Component extends DynamicFormElementBase = DynamicFormElementBase> {
  type: string;
  component: Type<Component>;
  libraryName: DynamicFormLibraryName;
}
