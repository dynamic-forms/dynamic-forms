import { Injectable } from '@angular/core';
import { FormGroupBuilder } from '../form-group/form-group.builder';
import { FormTemplate } from './form-template';

@Injectable()
export class FormBuilder {
  constructor(private formGroupBuilder: FormGroupBuilder) {}

  createForm(template: FormTemplate, model: any) {
    return this.formGroupBuilder.createForm(template, model);
  }
}
