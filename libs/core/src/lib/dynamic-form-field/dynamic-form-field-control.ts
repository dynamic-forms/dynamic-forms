import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';
import { Observable } from 'rxjs';

export type DynamicFormFieldControl<TValue> = AbstractControl<TValue>;

export class FormControlBase<TValue> extends FormControl<TValue>
  implements DynamicFormFieldControl<TValue> {}

export class FormGroupBase<TValue extends { [key: string]: any }>
  extends FormGroup<{ [Key in keyof TValue]: AbstractControl<TValue[Key]> }>
    implements DynamicFormFieldControl<TValue> {
      override readonly value: TValue;
      override readonly valueChanges: Observable<TValue>;
    }

export class FormArrayBase<TValue> extends FormArray<AbstractControl<TValue>>
  implements DynamicFormFieldControl<TValue[]> {}

export class FormRecordBase<TValue> extends FormRecord<AbstractControl<TValue>>
  implements DynamicFormFieldControl<{ [key: string]: TValue }> {}
