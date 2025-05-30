import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormSelect, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-select',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-select.component.html',
})
export class BsDynamicFormSelectComponent extends DynamicFormInputBase<DynamicFormSelect> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
