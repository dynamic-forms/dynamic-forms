import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormInputBase, DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-radio',
  templateUrl: './dynamic-form-radio.component.html',
  imports: [CommonModule, ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatRadioModule],
})
export class MatDynamicFormRadioComponent extends DynamicFormInputBase<DynamicFormRadio> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
