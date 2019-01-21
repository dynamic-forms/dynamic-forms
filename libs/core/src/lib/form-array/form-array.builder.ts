import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayField, FormArrayTemplate } from './form-array.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createField(root: FormField, parent: FormField, template: FormArrayTemplate): FormArrayField {
    const field = new FormArrayField(root, parent, template);
    field.data = this.createData(template, parent);
    field.control = new FormArray([]);
    return field;
  }

  private createData(template: FormArrayTemplate, parent: FormField) {
    return {
      model: this.createModel(template, parent, []),
      parentModel: parent.data.model,
      rootModel: parent.data.rootModel
    };
  }
}
