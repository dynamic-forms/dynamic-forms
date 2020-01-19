import { Type } from '@angular/core';
import { DynamicFormElementBase } from '../dynamic-form-element/dynamic-form-element-base';
import { DynamicFormLibrary } from './dynamic-form-library';

export interface DynamicFormComponentType<Component extends DynamicFormElementBase> {
  type: string;
  component: Type<Component>;
  library: DynamicFormLibrary;
}
