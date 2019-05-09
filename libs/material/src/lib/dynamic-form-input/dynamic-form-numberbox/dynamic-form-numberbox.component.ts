import { Component } from '@angular/core';
import { DynamicFormNumberbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html'
})
export class DynamicFormNumberboxComponent extends MatDynamicFormInputComponent<DynamicFormNumberbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
