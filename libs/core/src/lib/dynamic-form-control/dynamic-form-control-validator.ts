import { ValidatorFn } from '@angular/forms';

export interface DynamicFormControlValidator {
  key: string;
  enabled: boolean;
  value: any;
  validatorFn: ValidatorFn;
  factory: (value: any) => ValidatorFn;
}
