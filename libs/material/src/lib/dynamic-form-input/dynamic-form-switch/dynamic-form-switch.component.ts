import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormInputBase, DynamicFormSwitch, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-switch',
  templateUrl: './dynamic-form-switch.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatSlideToggleModule],
})
export class MatDynamicFormSwitchComponent extends DynamicFormInputBase<DynamicFormSwitch> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
