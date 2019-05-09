import { Component } from '@angular/core';
import { DynamicFormDropdown, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-dropdown',
  templateUrl: './dynamic-form-dropdown.component.html'
})
export class DynamicFormDropdownComponent extends MatDynamicFormInputComponent<DynamicFormDropdown> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
