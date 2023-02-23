import { Component } from '@angular/core';
import { DynamicFormBuilder, DynamicFormFileBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-file',
  templateUrl: './dynamic-form-file.component.html',
})
export class MatDynamicFormFileComponent extends DynamicFormFileBase {
  constructor(protected override builder: DynamicFormBuilder, protected override validationService: DynamicFormValidationService) {
    super(builder, validationService);
  }
}
