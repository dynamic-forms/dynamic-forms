import { Component } from '@angular/core';
import { DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html'
})
export class DynamicFormRadioComponent extends MatDynamicFormInputComponent<DynamicFormRadio> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
