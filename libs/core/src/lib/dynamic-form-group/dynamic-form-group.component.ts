import { Component } from '@angular/core';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormGroup } from './dynamic-form-group';

@Component({
  selector: 'dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html'
})
export class DynamicFormGroupComponent extends DynamicFormFieldWrapper<DynamicFormGroup> {
  get fields() { return this.field.fields; }
}
