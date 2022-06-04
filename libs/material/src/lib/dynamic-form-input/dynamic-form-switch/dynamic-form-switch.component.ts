import { Component } from '@angular/core';
import { DynamicFormInputBase, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-switch',
  templateUrl: './dynamic-form-switch.component.html',
})
export class MatDynamicFormSwitchComponent extends DynamicFormInputBase<DynamicFormSwitch> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
