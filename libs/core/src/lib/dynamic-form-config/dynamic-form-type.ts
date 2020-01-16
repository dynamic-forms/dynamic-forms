import { Type } from '@angular/core';
import { DynamicFormLibrary } from './dynamic-form-library';

export interface DynamicFormType<Component> {
  library: DynamicFormLibrary;
  type: string;
  component: Type<Component>;
}
