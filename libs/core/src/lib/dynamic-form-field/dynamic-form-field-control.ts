import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { Observable } from 'rxjs';

export type DynamicFormFieldControl<Value> = AbstractControl<Value>;

export class FormControlBase<Value> extends FormControl<Value> implements DynamicFormFieldControl<Value> {}

export class FormGroupBase<Value extends Record<string, any>>
  extends FormGroup<{ [Key in keyof Value]: AbstractControl<Value[Key]> }>
  implements DynamicFormFieldControl<Value>
{
  override readonly value: Value;
  override readonly valueChanges: Observable<Value>;
}

export class FormArrayBase<Value> extends FormArray<AbstractControl<Value>> implements DynamicFormFieldControl<Value[]> {}

export class FormRecordBase<Value> extends FormRecord<AbstractControl<Value>> implements DynamicFormFieldControl<Record<string, Value>> {}
