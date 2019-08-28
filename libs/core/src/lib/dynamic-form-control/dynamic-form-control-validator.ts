import { ValidatorFn } from '@angular/forms';

export interface DynamicFormControlValidator {
  key: string;
  factory: (parameters: any) => ValidatorFn;
  enabled: boolean;
  parameters: any;
  validatorFn: ValidatorFn;
}
