import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormNumberbox, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html',
  imports: [ReactiveFormsModule, BsDynamicFormInputWrapperComponent],
})
export class BsDynamicFormNumberboxComponent extends DynamicFormInputBase<DynamicFormNumberbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
