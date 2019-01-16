import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';
import { FormFieldBuilder } from '../form-field';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createFormField(template: FormArrayTemplate, parentPath: string, parentModel: any): FormArrayField {
    const path = this.getPath(template, parentPath);
    const model = this.getModel(template, parentModel);
    const control = new FormArray(model);
    return new FormArrayField(path, template, control, parentModel, model, []);
  }
}
