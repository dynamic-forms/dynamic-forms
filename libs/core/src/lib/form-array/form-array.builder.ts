import { Injectable } from '@angular/core';
import { FormArrayField, FormArrayTemplate } from './form-array.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createField(root: FormField, parent: FormField, template: FormArrayTemplate): FormArrayField {
    const field = new FormArrayField(root, parent, template);
    field.setFields([]);
    field.setControl([]);
    return field;
  }
}
