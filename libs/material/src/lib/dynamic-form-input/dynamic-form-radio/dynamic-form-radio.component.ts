import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html'
})
export class DynamicFormRadioComponent extends DynamicFormInputComponent<DynamicFormRadio> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
