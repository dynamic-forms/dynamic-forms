import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';

export class FormControlBase<TValue> extends FormControl<TValue> {}

export class FormGroupBase<TValue extends { [key: string]: any }>
  extends FormGroup<{ [Key in keyof TValue ]: AbstractControl<TValue[Key]> }> {}

export class FormArrayBase<TValue> extends FormArray<AbstractControl<TValue>> {}

export class FormRecordBase<TValue> extends FormRecord<AbstractControl<TValue>> {}

export type DynamicFormFieldControl<TValue> = AbstractControl<TValue> |
  FormControlBase<TValue> | FormGroupBase<TValue> | FormArrayBase<TValue> | FormRecordBase<TValue>;
