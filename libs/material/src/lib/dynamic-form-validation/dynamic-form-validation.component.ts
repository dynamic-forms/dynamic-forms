import { Component } from '@angular/core';
import { DynamicFormValidationComponent, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-validation',
  templateUrl: './dynamic-form-validation.component.html'
})
export class MatDynamicFormValidationComponent extends DynamicFormValidationComponent {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
