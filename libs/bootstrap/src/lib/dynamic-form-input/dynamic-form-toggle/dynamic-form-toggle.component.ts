import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-toggle',
  templateUrl: './dynamic-form-toggle.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class BsDynamicFormToggleComponent extends DynamicFormInputBase<DynamicFormToggle> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
