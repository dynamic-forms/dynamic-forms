import { FormArray } from '@angular/forms';
import { FormFieldTemplate, FormField } from '../form-field/form-field.model';

export interface FormArrayTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormArrayField implements FormField {
  constructor(
    public path: string,
    public template: FormArrayTemplate,
    public control: FormArray,
    public parentModel: any,
    public model: any,
    public fields: FormField[]) {}
}
