import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormDatepicker, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-datepicker',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-datepicker.component.html',
})
export class BsDynamicFormDatepickerComponent extends DynamicFormInputBase<DynamicFormDatepicker> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
