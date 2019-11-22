import { Type } from '@angular/core';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';

export interface DynamicFormInputType {
  type: string;
  component: Type<DynamicFormInputComponent>;
  wrappers?: string[];
}

export interface DynamicFormInputConfig {
  types?: DynamicFormInputType[];
}
