import { Type } from '@angular/core';
import { FormControlInputComponent } from './form-control-input.component';
import { FormControlType } from './form-control-type';

export interface FormControlTypeConfig {
  type: FormControlType;
  component: Type<FormControlInputComponent>;
}

export interface FormControlConfig {
  defaultType?: FormControlTypeConfig;
  types?: FormControlTypeConfig[];
}
