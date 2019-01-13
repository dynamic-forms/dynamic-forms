import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DynamicFormItem } from '.';

export type FormControlType = FormGroup | FormArray | FormControl;

export interface DynamicFormField {
  template: DynamicFormItem;
  control: FormControlType;
  model: any;
  fields?: DynamicFormField[];
}
