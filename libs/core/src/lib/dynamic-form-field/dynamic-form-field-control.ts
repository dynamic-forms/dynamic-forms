import { AbstractControl, FormArray, FormControl, FormGroup, FormRecord } from '@angular/forms';

export type DynamicFormFieldControl = AbstractControl | FormControl | FormGroup | FormArray | FormRecord;
