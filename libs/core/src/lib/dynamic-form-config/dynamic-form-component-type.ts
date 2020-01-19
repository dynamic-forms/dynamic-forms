import { Type } from '@angular/core';
import { DynamicFormLibrary } from './dynamic-form-library';

export interface DynamicFormComponentType<Component> {
  type: string;
  component: Type<Component>;
  library: DynamicFormLibrary;
}
