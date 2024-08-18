import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormSelect, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-select',
  templateUrl: './dynamic-form-select.component.html',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
})
export class BsDynamicFormSelectComponent extends DynamicFormInputBase<DynamicFormSelect> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
