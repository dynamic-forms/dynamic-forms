import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayField, FormArrayTemplate } from './form-array.model';
import { FormField } from '../form-field/form-field.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createField(template: FormArrayTemplate, parent: FormField): FormArrayField {
    const path = this.getPath(template, parent);
    const data = this.createData(template, parent);
    const control = new FormArray([]);
    return new FormArrayField(parent, path, data, template, null, control, []);
  }

  private createData(template: FormArrayTemplate, parent: FormField) {
    return {
      model: this.createModel(template, parent, []),
      parentModel: parent.data.model,
      rootModel: parent.data.rootModel
    };
  }
}
