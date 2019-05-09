import { Component } from '@angular/core';
import { DynamicFormTextbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputComponent } from '../mat-dynamic-form-input.component';

@Component({
  selector: 'mat-dynamic-form-textbox',
  templateUrl: './dynamic-form-textbox.component.html'
})
export class DynamicFormTextboxComponent extends MatDynamicFormInputComponent<DynamicFormTextbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
