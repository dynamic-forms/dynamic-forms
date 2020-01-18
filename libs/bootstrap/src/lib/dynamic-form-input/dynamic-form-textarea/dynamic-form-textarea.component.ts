import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html'
})
export class BsDynamicFormTextareaComponent extends DynamicFormInputBase<DynamicFormTextarea> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
