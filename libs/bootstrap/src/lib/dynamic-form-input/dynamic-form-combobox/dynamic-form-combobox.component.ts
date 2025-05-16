import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormCombobox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-combobox',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-combobox.component.html',
})
export class BsDynamicFormComboboxComponent extends DynamicFormInputBase<DynamicFormCombobox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
