import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField, FormFieldData } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField implements FormField {
  constructor(
    public path: string,
    public data: FormFieldData,
    public template: FormArrayTemplate,
    public control: FormArray,
    public fields: FormField[]) {}
}
