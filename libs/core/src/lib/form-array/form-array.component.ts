import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { FormArrayField, FormArrayTemplate } from './form-array.model';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './form-array.component.html'
})
export class FormArrayComponent {
  @Input() formField: FormArrayField;

  get template(): FormArrayTemplate {
    return this.formField.template;
  }

  get control(): FormArray {
    return this.formField.control;
  }
}
