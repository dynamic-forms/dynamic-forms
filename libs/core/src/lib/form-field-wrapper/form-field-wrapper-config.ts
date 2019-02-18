import { Type } from '@angular/core';
import { FormFieldWrapper } from './form-field-wrapper';
import { FormFieldWrapperType } from './form-field-wrapper-type';

export interface FormFieldWrapperTypeConfig {
  type: FormFieldWrapperType;
  component: Type<FormFieldWrapper>;
}

export interface FormFieldWrapperConfig {
  types: FormFieldWrapperTypeConfig[];
}
