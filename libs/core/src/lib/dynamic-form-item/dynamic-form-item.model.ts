import { FormGroup, FormArray, FormControl } from '@angular/forms';

export type DynamicFormItemType = 'group' | 'array' | 'control';

export interface DynamicFormItem {
  key: string;
  type: DynamicFormItemType;
  label: string;
}


