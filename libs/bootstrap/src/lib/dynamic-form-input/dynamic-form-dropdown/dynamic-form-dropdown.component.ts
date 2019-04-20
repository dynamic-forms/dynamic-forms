import { Component } from '@angular/core';
import { DynamicFormDropdown, DynamicFormInputComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-dropdown',
  templateUrl: './dynamic-form-dropdown.component.html'
})
export class DynamicFormDropdownComponent extends DynamicFormInputComponent<DynamicFormDropdown> {}
