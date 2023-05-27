import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormCheckbox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-checkbox',
  templateUrl: './dynamic-form-checkbox.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class BsDynamicFormCheckboxComponent extends DynamicFormInputBase<DynamicFormCheckbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
