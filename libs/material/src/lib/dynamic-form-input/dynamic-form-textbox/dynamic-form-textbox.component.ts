import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormElementComponent, DynamicFormInputBase, DynamicFormTextbox,
  DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-textbox',
  templateUrl: './dynamic-form-textbox.component.html',
  imports: [CommonModule, ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatInputModule],
})
export class MatDynamicFormTextboxComponent extends DynamicFormInputBase<DynamicFormTextbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
