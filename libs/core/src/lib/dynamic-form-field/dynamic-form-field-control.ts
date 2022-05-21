import { AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

export type DynamicFormFieldControl = AbstractControl | UntypedFormGroup | UntypedFormArray | UntypedFormControl;
