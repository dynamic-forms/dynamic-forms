import { Component } from '@angular/core';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormArray } from './dynamic-form-array';

@Component({
  selector: 'dynamic-form-array',
  templateUrl: './dynamic-form-array.component.html',
  styleUrls: ['./dynamic-form-array.component.scss']
})
export class DynamicFormArrayComponent extends DynamicFormFieldBase<DynamicFormArray> {
  get fields() { return this.field.fields; }
}
