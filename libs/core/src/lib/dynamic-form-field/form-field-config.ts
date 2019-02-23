import { Type } from '@angular/core';
import { FormFieldWrapperType } from '../dynamic-form-field-wrapper/form-field-wrapper-type';
import { DynamicFormFieldBase } from './dynamic-form-field.base';
import { FormFieldType } from './form-field-type';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<DynamicFormFieldBase>;
  wrappers?: FormFieldWrapperType[];
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
