import { Component } from '@angular/core';
import { DynamicFormDatepicker, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html'
})
export class MatDynamicFormDatepickerComponent extends DynamicFormInputBase<DynamicFormDatepicker> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
