import { Type } from '@angular/core';
import { FormInputComponent } from './form-input/form-input.component';

export interface FormControlTypeConfig {
  type: string;
  component: Type<FormInputComponent>;
}

export interface FormControlConfig {
  defaultType: FormControlTypeConfig;
  types: FormControlTypeConfig[];
}
