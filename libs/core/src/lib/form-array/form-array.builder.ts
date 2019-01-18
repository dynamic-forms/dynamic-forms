import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';
import { FormFieldBuilder } from '../form-field/form-field.builder';

@Injectable()
export class FormArrayBuilder extends FormFieldBuilder {
  createFormField(parentPath: string, parentModel: any, template: FormArrayTemplate): FormArrayField {
    const path = this.getPath(parentPath, template);
    const model = this.getModel(parentModel, template);
    const control = new FormArray([]);
    return new FormArrayField(path, template, control, parentModel, model, []);
  }
}
