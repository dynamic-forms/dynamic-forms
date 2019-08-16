import { Component } from '@angular/core';
import { DynamicFormInputComponent, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html'
})
export class DynamicFormTextareaComponent extends DynamicFormInputComponent<DynamicFormTextarea> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
