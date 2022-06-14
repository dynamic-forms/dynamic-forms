import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';

export type FormGroupControls<TValue> = { [Key in keyof TValue ]: AbstractControl<TValue[Key]> };

export class FormControlBase<TValue> extends FormControl<TValue> {}

export class FormGroupBase<TValue extends { [key: string]: any }> extends FormGroup<FormGroupControls<TValue>> {}

export class FormArrayBase<TValue> extends FormArray<AbstractControl<TValue>> {}

export class FormRecordBase<TValue> extends FormRecord<AbstractControl<TValue>> {}

export type DynamicFormFieldControl<TValue> = AbstractControl<TValue> |
  FormControlBase<TValue> | FormGroupBase<TValue> | FormArrayBase<TValue> | FormRecordBase<TValue>;

/*
export const createFormControl: <TValue>(value: TValue, options: FormControlOptions) => FormControlBase<TValue> =
  <TValue>(value: TValue, options: FormControlOptions) => new FormControl<TValue>(value, options);

export const createFormGroup: <TValue>() => FormGroupBase<TValue> = <TValue>() =>
  new FormGroup<FormGroupControls<TValue>>({} as any);

export const createFormArray: <TValue>() => FormArrayBase<TValue> = <TValue>() =>
  new FormArray<AbstractControl<TValue>>([]);

export const createFormRecord: <TValue>() => FormRecordBase<TValue> = <TValue>() =>
  new FormRecord<AbstractControl<TValue>>({});
*/
