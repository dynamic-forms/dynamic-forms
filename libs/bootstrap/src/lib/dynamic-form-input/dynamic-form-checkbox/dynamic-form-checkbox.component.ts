import { Component } from '@angular/core';
import { DynamicFormCheckbox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html'
})
export class BsDynamicFormCheckboxComponent extends DynamicFormInputBase<DynamicFormCheckbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
