import { Component } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDynamicFormInputWrapperComponent } from '@dynamic-forms/bootstrap';
import { DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormInputMaskBase, DynamicFormInputMaskDirective } from '@dynamic-forms/core/input-mask';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-input-mask',
  templateUrl: './dynamic-form-input-mask.component.html',
  imports: [ReactiveFormsModule, DynamicFormInputMaskDirective, BsDynamicFormInputWrapperComponent],
})
export class BsDynamicFormInputMaskComponent extends DynamicFormInputMaskBase {
  protected _ngControl: NgControl;

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
