import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormTextbox, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-textbox',
  templateUrl: './dynamic-form-textbox.component.html'
})
export class BsDynamicFormTextboxComponent extends DynamicFormInputBase<DynamicFormTextbox> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
