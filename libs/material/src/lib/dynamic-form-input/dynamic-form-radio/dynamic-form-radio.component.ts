import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html'
})
export class MatDynamicFormRadioComponent extends DynamicFormInputBase<DynamicFormRadio> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
