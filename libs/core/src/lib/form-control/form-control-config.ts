import { Type } from '@angular/core';
import { FormControlInputComponent } from './form-control-input.component';

export interface FormControlTypeConfig {
  type: string;
  component: Type<FormControlInputComponent>;
}

export interface FormControlConfig {
  defaultType: FormControlTypeConfig;
  types: FormControlTypeConfig[];
}
