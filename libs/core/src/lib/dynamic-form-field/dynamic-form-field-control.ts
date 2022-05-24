import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export type DynamicFormFieldControl = AbstractControl | FormGroup | FormArray | FormControl;
