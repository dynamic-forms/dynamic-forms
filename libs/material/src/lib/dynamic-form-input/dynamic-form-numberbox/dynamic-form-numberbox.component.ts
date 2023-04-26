import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormElementComponent, DynamicFormInputBase, DynamicFormNumberbox, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-numberbox',
  templateUrl: './dynamic-form-numberbox.component.html',
  imports: [CommonModule, ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatInputModule],
})
export class MatDynamicFormNumberboxComponent extends DynamicFormInputBase<DynamicFormNumberbox> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
