import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html',
  imports: [CommonModule, ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
})
export class BsDynamicFormTextareaComponent extends DynamicFormInputBase<DynamicFormTextarea> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
