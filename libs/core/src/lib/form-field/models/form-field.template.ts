import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type FormFieldType = 'group' | 'array' | 'control';
export type FormFieldControl = AbstractControl | FormGroup | FormArray | FormControl;

export interface FormFieldTemplate {
  key: string;
  type: FormFieldType;
  label: string;
  hidden?: boolean;
  disabled?: boolean;
  expressions?: { [key: string]: string };
}
