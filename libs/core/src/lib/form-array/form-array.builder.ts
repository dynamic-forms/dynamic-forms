import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayTemplate } from './form-array.model';
import { FormField } from '../form-field';

@Injectable()
export class FormArrayBuilder {
  createFormField(template: FormArrayTemplate, parentModel: any): FormField {
    const model = parentModel ? parentModel[template.key] : null;
    const control = new FormArray(model);
    return { template, control, model };
  }
}
