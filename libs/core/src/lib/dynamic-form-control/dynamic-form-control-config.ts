import { Type } from '@angular/core';
import { DynamicFormFieldWrapperType } from '../dynamic-form-field-wrapper/dynamic-form-field-wrapper-type';
import { DynamicFormControlInputComponent } from './dynamic-form-control-input.component';
import { DynamicFormControlType } from './dynamic-form-control-type';

export interface DynamicFormControlTypeConfig {
  type: DynamicFormControlType;
  component: Type<DynamicFormControlInputComponent>;
  wrappers?: DynamicFormFieldWrapperType[];
}

export interface DynamicFormControlConfig {
  types?: DynamicFormControlTypeConfig[];
  defaultType?: DynamicFormControlTypeConfig;
}
