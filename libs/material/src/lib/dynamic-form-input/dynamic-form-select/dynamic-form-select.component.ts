import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormElementComponent, DynamicFormInputBase, DynamicFormSelect, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-select',
  imports: [ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatSelectModule],
  templateUrl: './dynamic-form-select.component.html',
})
export class MatDynamicFormSelectComponent extends DynamicFormInputBase<DynamicFormSelect> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
