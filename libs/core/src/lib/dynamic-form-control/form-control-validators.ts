import { ValidatorFn } from '@angular/forms';

export interface FormControlValidator {
  key: string;
  enabled: boolean;
  value: any;
  factory: (value: any) => ValidatorFn;
  validator: ValidatorFn;
}

export type FormControlValidators = FormControlValidator[];
