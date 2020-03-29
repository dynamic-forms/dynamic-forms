import { ValidatorFn } from '@angular/forms';

export type DynamicFormControlValidatorFactory = (parameters: any) => ValidatorFn;
