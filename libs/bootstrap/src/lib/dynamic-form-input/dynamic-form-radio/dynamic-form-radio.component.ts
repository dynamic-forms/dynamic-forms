import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html',
  imports: [NgFor, ReactiveFormsModule],
})
export class BsDynamicFormRadioComponent extends DynamicFormInputBase<DynamicFormRadio> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
