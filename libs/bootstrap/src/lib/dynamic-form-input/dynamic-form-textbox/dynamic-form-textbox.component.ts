import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormTextbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-textbox',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-textbox.component.html',
})
export class BsDynamicFormTextboxComponent extends DynamicFormInputBase<DynamicFormTextbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
