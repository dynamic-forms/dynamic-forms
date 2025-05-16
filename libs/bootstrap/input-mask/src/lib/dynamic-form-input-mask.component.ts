import { Component } from '@angular/core';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { BsDynamicFormInputWrapperComponent } from '@dynamic-forms/bootstrap';
import { DynamicFormValidationService } from '@dynamic-forms/core';
import { DynamicFormInputMaskBase, DynamicFormInputMaskDirective } from '@dynamic-forms/core/input-mask';

@Component({
  selector: 'bs-dynamic-form-input-mask',
  imports: [ReactiveFormsModule, DynamicFormInputMaskDirective, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-input-mask.component.html',
})
export class BsDynamicFormInputMaskComponent extends DynamicFormInputMaskBase {
  protected _ngControl: NgControl;

  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
