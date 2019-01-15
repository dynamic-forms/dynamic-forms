import { Injectable } from '@angular/core';
import { FormTemplate } from './form.model';
import { FormField } from '../form-field';
import { FormGroupBuilder } from '../form-group';

@Injectable()
export class FormBuilder {
  constructor(private formGroupBuilder: FormGroupBuilder) {}

  createFormField(template: FormTemplate, model: any): FormField {
    return this.formGroupBuilder.createFormField(template, model);
  }
}
