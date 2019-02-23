import { Type } from '@angular/core';
import { FormFieldWrapperType } from '../form-field-wrapper/form-field-wrapper-type';
import { FormControlInputComponent } from './form-control-input.component';
import { FormControlType } from './form-control-type';

export interface FormControlTypeConfig {
  type: FormControlType;
  component: Type<FormControlInputComponent>;
  wrappers?: FormFieldWrapperType[];
}

export interface FormControlConfig {
  types?: FormControlTypeConfig[];
  defaultType?: FormControlTypeConfig;
}
