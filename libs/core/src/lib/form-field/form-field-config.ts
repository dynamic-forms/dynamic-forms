import { Type } from '@angular/core';
import { FormFieldWrapperType } from '../form-field-wrapper/form-field-wrapper-type';
import { FormFieldType } from './form-field-type';
import { FormFieldBase } from './form-field.base';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<FormFieldBase>;
  wrappers?: FormFieldWrapperType[];
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
