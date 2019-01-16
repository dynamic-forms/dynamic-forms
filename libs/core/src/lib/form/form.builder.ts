import { Injectable } from '@angular/core';
import { FormTemplate } from './form.model';
import { FormGroupBuilder, FormGroupField } from '../form-group';

@Injectable()
export class FormBuilder {
  constructor(private formGroupBuilder: FormGroupBuilder) {}

  createFormField(template: FormTemplate, model: any): FormGroupField {
    return this.formGroupBuilder.createFormField(template, null, model);
  }
}
