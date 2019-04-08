import { Component } from '@angular/core';
import { DynamicFormInputComponent } from '@dynamic-forms/core';
import { DynamicFormDropdown } from './dynamic-form-dropdown';

@Component({
  selector: 'mat-dynamic-form-dropdown',
  templateUrl: './dynamic-form-dropdown.component.html'
})
export class DynamicFormDropdownComponent extends DynamicFormInputComponent<DynamicFormDropdown> {}
