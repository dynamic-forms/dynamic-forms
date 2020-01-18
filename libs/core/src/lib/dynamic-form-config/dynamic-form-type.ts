import { Type } from '@angular/core';
import { DynamicFormLibrary } from './dynamic-form-library';

export interface DynamicFormType<Component> {
  type: string;
  component: Type<Component>;
  library: DynamicFormLibrary;
}
