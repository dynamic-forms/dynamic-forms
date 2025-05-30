import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormInputBase, DynamicFormRadio, DynamicFormValidationService } from '@dynamic-forms/core';
import { MatDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'mat-dynamic-form-radio',
  imports: [ReactiveFormsModule, MatDynamicFormInputWrapperComponent, MatRadioModule],
  templateUrl: './dynamic-form-radio.component.html',
})
export class MatDynamicFormRadioComponent extends DynamicFormInputBase<DynamicFormRadio> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
