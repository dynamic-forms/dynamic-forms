import { Component } from '@angular/core';
import { DynamicFormSelect, DynamicFormInputComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-select',
  templateUrl: './dynamic-form-select.component.html'
})
export class DynamicFormSelectComponent extends DynamicFormInputComponent<DynamicFormSelect> {}
