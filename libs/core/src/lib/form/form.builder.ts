import { Injectable } from '@angular/core';
import { FormTemplate } from './form.model';
import { FormGroupField } from '../form-group/form-group.model';
import { FormGroupBuilder } from '../form-group/form-group.builder';

@Injectable()
export class FormBuilder {
  constructor(private formGroupBuilder: FormGroupBuilder) {}

  createForm(template: FormTemplate, model: any): FormGroupField {
    return this.formGroupBuilder.createForm(template, model);
  }
}
