import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';

export type DynamicFormFieldControl<TValue> =
  AbstractControl<TValue> |
  FormControl<TValue> |
  FormGroup<{ [Key in keyof TValue ]: AbstractControl<TValue[Key]> }> |
  FormArray<AbstractControl<TValue>> |
  FormRecord<AbstractControl<TValue>>;
