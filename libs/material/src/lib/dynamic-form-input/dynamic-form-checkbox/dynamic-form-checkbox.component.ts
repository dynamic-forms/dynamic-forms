import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormCheckbox } from './dynamic-form-checkbox';

@Component({
  selector: 'mat-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html'
})
export class DynamicFormCheckboxComponent extends DynamicFormInputComponent<DynamicFormCheckbox> {}
