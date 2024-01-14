import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormElementComponent, DynamicFormInputBase, DynamicFormTextarea, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-textarea',
  templateUrl: './dynamic-form-textarea.component.html',
  imports: [NgIf, ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatInputModule],
})
export class MatDynamicFormTextareaComponent extends DynamicFormInputBase<DynamicFormTextarea> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
