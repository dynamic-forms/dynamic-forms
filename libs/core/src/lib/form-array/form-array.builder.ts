import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';

@Injectable()
export class FormArrayBuilder {
  createFormField(template: FormArrayTemplate, parentModel: any): FormArrayField {
    const model = parentModel ? parentModel[template.key] : null;
    const control = new FormArray(model);
    return new FormArrayField(template, control, parentModel, model, []);
  }
}
