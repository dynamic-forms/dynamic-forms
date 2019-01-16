import { FormFieldTemplate, FormField } from '../form-field';
import { FormGroup } from '@angular/forms';

export interface FormGroupTemplate extends FormFieldTemplate {
  fields: FormFieldTemplate[];
}

export class FormGroupField implements FormField {
  constructor(
    public template: FormGroupTemplate,
    public control: FormGroup,
    public model: any,
    public fields: FormField[]) {}
}
