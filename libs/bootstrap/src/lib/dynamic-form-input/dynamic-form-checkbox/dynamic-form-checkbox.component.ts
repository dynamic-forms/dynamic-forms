import { Component } from '@angular/core';
import { DynamicFormCheckbox, DynamicFormInputComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html'
})
export class DynamicFormCheckboxComponent extends DynamicFormInputComponent<DynamicFormCheckbox> {}
