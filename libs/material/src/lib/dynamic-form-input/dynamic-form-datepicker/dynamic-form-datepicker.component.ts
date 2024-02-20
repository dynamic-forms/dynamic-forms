import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DynamicFormDatepicker,
  DynamicFormElementComponent,
  DynamicFormInputBase,
  DynamicFormValidationService,
} from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-datepicker',
  templateUrl: './dynamic-form-datepicker.component.html',
  imports: [NgIf, ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatInputModule, MatDatepickerModule],
})
export class MatDynamicFormDatepickerComponent extends DynamicFormInputBase<DynamicFormDatepicker> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
