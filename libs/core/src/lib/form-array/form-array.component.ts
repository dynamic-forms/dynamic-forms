import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayField, FormArrayTemplate } from './form-array.model';
import { FormFieldExpressions } from '../form-field/form-field.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent {
  @Input() formField: FormArrayField;

  get template(): FormArrayTemplate {
    return this.formField.template;
  }

  get expressions(): FormFieldExpressions {
    return this.formField.expressions;
  }

  get control(): FormArray {
    return this.formField.control;
  }
}
