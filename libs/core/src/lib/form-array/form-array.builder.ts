import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayField, FormArrayTemplate } from './form-array.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createField(root: FormField, parent: FormField, template: FormArrayTemplate): FormArrayField {
    const field = new FormArrayField(root, parent, template);
    field.model = this.createModel(field.template, parent, []);
    field.control = new FormArray([]);
    return field;
  }
}
