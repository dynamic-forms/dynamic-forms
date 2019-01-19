import { Type } from '@angular/core';
import { FormInputComponent } from './form-input/form-input.component';

export interface FormControlTypeConfig {
  type: string;
  component: Type<any>;
}

export interface FormControlConfig {
  defaultType: FormControlTypeConfig;
  types: FormControlTypeConfig[];
}

export const defaultControlConfig: FormControlConfig = {
  defaultType: { type: 'input', component: FormInputComponent },
  types: [
    { type: 'input', component: FormInputComponent }
  ]
};
