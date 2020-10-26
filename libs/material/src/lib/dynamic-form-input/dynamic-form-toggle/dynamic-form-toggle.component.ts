import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-toggle',
  templateUrl: './dynamic-form-toggle.component.html'
})
export class MatDynamicFormToggleComponent extends DynamicFormInputBase<DynamicFormToggle> {
  constructor(protected validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
