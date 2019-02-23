import { Component } from '@angular/core';
import { DynamicFormControlInputComponent } from '@dynamic-forms/core';
import { DropdownInput } from './dropdown-input';

@Component({
  selector: 'mat-dynamic-dropdown',
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent extends DynamicFormControlInputComponent<DropdownInput> {}
