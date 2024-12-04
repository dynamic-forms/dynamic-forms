import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormInputBase, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-switch',
  templateUrl: './dynamic-form-switch.component.html',
  imports: [ReactiveFormsModule],
})
export class BsDynamicFormSwitchComponent extends DynamicFormInputBase<DynamicFormSwitch> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
