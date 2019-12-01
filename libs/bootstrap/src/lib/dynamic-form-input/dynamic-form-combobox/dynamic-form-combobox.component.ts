import { Component } from '@angular/core';
import { DynamicFormCombobox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-combobox',
  templateUrl: './dynamic-form-combobox.component.html'
})
export class DynamicFormComboboxComponent extends DynamicFormInputBase<DynamicFormCombobox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
