import { FormFieldTemplate, FormField } from '../form-field';
import { FormArray } from '@angular/forms';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField implements FormField {
  constructor(
    public template: FormArrayTemplate,
    public control: FormArray,
    public parentModel: any,
    public model: any,
    public fields: FormField[]) {}
}
