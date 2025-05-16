import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DynamicFormInputBase, DynamicFormToggle, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'mat-dynamic-form-toggle',
  imports: [ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatButtonToggleModule],
  templateUrl: './dynamic-form-toggle.component.html',
})
export class MatDynamicFormToggleComponent extends DynamicFormInputBase<DynamicFormToggle> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
