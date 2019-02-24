import { Type } from '@angular/core';
import { DynamicFormInputType } from '../dynamic-form-input/dynamic-form-input-type';
import { DynamicFormInputComponent } from '../dynamic-form-input/dynamic-form-input.component';
import { DynamicFormWrapperType } from '../dynamic-form-wrapper/dynamic-form-wrapper-type';

export interface DynamicFormInputTypeConfig {
  type: DynamicFormInputType;
  component: Type<DynamicFormInputComponent>;
  wrappers?: DynamicFormWrapperType[];
}

export interface DynamicFormInputConfig {
  types?: DynamicFormInputTypeConfig[];
  defaultType?: DynamicFormInputTypeConfig;
}
