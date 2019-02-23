import { Component } from '@angular/core';
import { DynamicFormFieldBase } from './../dynamic-form-field/dynamic-form-field.base';
import { DynamicFormGroup } from './dynamic-form-group';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss']
})
export class DynamicFormGroupComponent extends DynamicFormFieldBase<DynamicFormGroup> {
  constructor() {
    super();
  }

  get fields() { return this.field.fields; }
}
