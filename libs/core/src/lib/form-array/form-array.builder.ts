import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormFieldData } from '../form-field';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createFormField(template: FormArrayTemplate, parentData: FormFieldData, parentPath: string): FormArrayField {
    const path = this.getPath(template, parentPath);
    const data = this.createData(template, parentData);
    const control = new FormArray([]);
    return new FormArrayField(path, data, template, null, control, []);
  }

  private createData(template: FormArrayTemplate, parentData: FormFieldData) {
    return {
      model: this.createModel(template, parentData, []),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }
}
