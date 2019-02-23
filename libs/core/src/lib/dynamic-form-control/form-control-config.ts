import { Type } from '@angular/core';
import { FormFieldWrapperType } from '../dynamic-form-field-wrapper/form-field-wrapper-type';
import { DynamicFormControlInputComponent } from './dynamic-form-control-input.component';
import { FormControlType } from './form-control-type';

export interface FormControlTypeConfig {
  type: FormControlType;
  component: Type<DynamicFormControlInputComponent>;
  wrappers?: FormFieldWrapperType[];
}

export interface FormControlConfig {
  types?: FormControlTypeConfig[];
  defaultType?: FormControlTypeConfig;
}
