import { ValidatorFn } from '@angular/forms';

export interface DynamicFormControlValidator {
  key: string;
  enabled: boolean;
  value: any;
  factory: (value: any) => ValidatorFn;
  validator: ValidatorFn;
}

export type DynamicFormControlValidators = DynamicFormControlValidator[];
