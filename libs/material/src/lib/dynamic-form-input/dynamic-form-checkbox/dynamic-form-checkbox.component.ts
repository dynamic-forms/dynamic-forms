import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DynamicFormCheckbox, DynamicFormInputBase, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'mat-dynamic-form-checkbox',
  imports: [ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatCheckboxModule],
  templateUrl: './dynamic-form-checkbox.component.html',
})
export class MatDynamicFormCheckboxComponent extends DynamicFormInputBase<DynamicFormCheckbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
