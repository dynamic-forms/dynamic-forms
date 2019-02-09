import { Injectable } from '@angular/core';
import { FormField } from '../form-field/form-field';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormArrayField } from './form-array-field';
import { FormArrayTemplate } from './form-array-template';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder<FormArrayTemplate, FormArrayField> {
  createField(root: FormField, parent: FormField, template: FormArrayTemplate) {
    const field = new FormArrayField(root, parent, template);
    field.setFields([]);
    return field;
  }
}
