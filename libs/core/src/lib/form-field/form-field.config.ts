import { Type } from '@angular/core';
import { FormFieldType } from './form-field.model';
import { FormFieldComponent } from './form-field.component';

export interface FormFieldTypeConfig {
  type: FormFieldType;
  component: Type<FormFieldComponent>;
}

export interface FormFieldConfig {
  types: FormFieldTypeConfig[];
}
