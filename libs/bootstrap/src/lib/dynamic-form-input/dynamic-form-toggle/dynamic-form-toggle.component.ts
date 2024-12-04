import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-toggle',
  templateUrl: './dynamic-form-toggle.component.html',
  imports: [ReactiveFormsModule],
})
export class BsDynamicFormToggleComponent extends DynamicFormInputBase<DynamicFormToggle> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
