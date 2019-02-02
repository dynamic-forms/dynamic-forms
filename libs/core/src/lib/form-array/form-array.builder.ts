import { Injectable } from '@angular/core';
import { FormField, FormFieldBuilder } from '../form-field';
import { FormArrayField, FormArrayTemplate } from './models';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder<FormArrayTemplate, FormArrayField> {
  createField(root: FormField, parent: FormField, template: FormArrayTemplate) {
    const field = new FormArrayField(root, parent, template);
    field.setFields([]);
    return field;
  }
}
