import { Component } from '@angular/core';
import { DynamicFormCheckbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html',
  styleUrls: ['./dynamic-form-checkbox.component.scss']
})
export class DynamicFormCheckboxComponent extends MatDynamicFormInputComponent<DynamicFormCheckbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
