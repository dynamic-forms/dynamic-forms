import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormCheckbox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html',
  imports: [ReactiveFormsModule],
})
export class BsDynamicFormCheckboxComponent extends DynamicFormInputBase<DynamicFormCheckbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
