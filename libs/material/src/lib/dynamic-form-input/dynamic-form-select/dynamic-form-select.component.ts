import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormElementComponent, DynamicFormInputBase, DynamicFormSelect, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-select',
  templateUrl: './dynamic-form-select.component.html',
  imports: [ReactiveFormsModule, DynamicFormElementComponent, MatFormFieldModule, MatSelectModule],
})
export class MatDynamicFormSelectComponent extends DynamicFormInputBase<DynamicFormSelect> {
  constructor(protected override validationService: DynamicFormValidationService) {
    super(validationService);
  }
}
