import { Type } from '@angular/core';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';
import { FormFieldWrapperType } from './form-field-wrapper-type';

export interface FormFieldWrapperTypeConfig {
  type: FormFieldWrapperType;
  component: Type<DynamicFormFieldWrapper>;
}

export interface FormFieldWrapperConfig {
  types: FormFieldWrapperTypeConfig[];
}
