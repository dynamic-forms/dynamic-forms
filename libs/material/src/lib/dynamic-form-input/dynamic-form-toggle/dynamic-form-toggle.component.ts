import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DynamicFormInputBase, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-toggle',
  templateUrl: './dynamic-form-toggle.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatButtonToggleModule],
})
export class MatDynamicFormToggleComponent extends DynamicFormInputBase<DynamicFormToggle> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
