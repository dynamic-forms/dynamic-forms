import { Component } from '@angular/core';
import { DynamicFormDatepicker, DynamicFormInputComponent, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html'
})
export class DynamicFormDatepickerComponent extends DynamicFormInputComponent<DynamicFormDatepicker> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
