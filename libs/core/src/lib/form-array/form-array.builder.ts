import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate, FormArrayField } from './form-array.model';

@Injectable()
export class FormArrayBuilder {
  createFormField(template: FormArrayTemplate, parentPath: string, parentModel: any): FormArrayField {
    const path = parentPath ? `${parentPath}.${template.key}` : template.key;
    const model = parentModel ? parentModel[template.key] : null;
    const control = new FormArray(model);
    return new FormArrayField(path, template, control, parentModel, model, []);
  }
}
