import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormInputBase, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'mat-dynamic-form-switch',
  imports: [ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatSlideToggleModule],
  templateUrl: './dynamic-form-switch.component.html',
})
export class MatDynamicFormSwitchComponent extends DynamicFormInputBase<DynamicFormSwitch> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
