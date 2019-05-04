import { Component } from '@angular/core';
import { DynamicFormCombobox, DynamicFormInputComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html'
})
export class DynamicFormComboboxComponent extends DynamicFormInputComponent<DynamicFormCombobox> {}
