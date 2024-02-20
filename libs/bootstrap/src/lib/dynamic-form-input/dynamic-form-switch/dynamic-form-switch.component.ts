import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-switch',
  templateUrl: './dynamic-form-switch.component.html',
  imports: [NgIf, ReactiveFormsModule],
})
export class BsDynamicFormSwitchComponent extends DynamicFormInputBase<DynamicFormSwitch> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
