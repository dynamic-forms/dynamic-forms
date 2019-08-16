import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormSelect, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-select',
  templateUrl: './dynamic-form-select.component.html'
})
export class DynamicFormSelectComponent extends DynamicFormInputComponent<DynamicFormSelect> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
