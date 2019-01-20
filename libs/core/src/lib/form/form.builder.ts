import { Injectable } from '@angular/core';
import { FormTemplate } from './form.model';
import { FormGroupField } from '../form-group/form-group.model';
import { FormGroupBuilder } from '../form-group/form-group.builder';

@Injectable()
export class FormBuilder {
  constructor(private formGroupBuilder: FormGroupBuilder) {}

  createFormField(template: FormTemplate, model: any): FormGroupField {
    const data = { model: model, parentModel: model, rootModel: model };
    return this.formGroupBuilder.createFormField(template, null, data);
  }
}
