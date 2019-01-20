import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';
import { FormExpressionsBuilder } from '../form-expressions/form-expressions.builder';
import { FormFieldData } from '../form-field';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  constructor(protected expressionsBuilder: FormExpressionsBuilder) {
    super(expressionsBuilder);
  }

  createFormField(template: FormArrayTemplate, parentData: FormFieldData, parentPath: string): FormArrayField {
    const path = this.getPath(template, parentPath);
    const data = this.getData(template, parentData);
    const control = new FormArray([]);
    return new FormArrayField(path, data, template, control, []);
  }

  private getData(template: FormArrayTemplate, parentData: FormFieldData) {
    return {
      model: this.getModel(template, parentData, []),
      parentModel: parentData.model,
      rootModel: parentData.rootModel
    };
  }
}
