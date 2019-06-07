import { Component } from '@angular/core';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormArray } from './dynamic-form-array';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html',
  styleUrls: ['./dynamic-form-array.component.scss']
})
export class DynamicFormArrayComponent extends DynamicFormFieldWrapper<DynamicFormArray> {
  get fields() { return this.field.fields; }
}
