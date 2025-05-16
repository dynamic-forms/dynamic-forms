import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormBuilder, DynamicFormFileBase, DynamicFormFileDirective, DynamicFormValidationService } from '@dynamic-forms/core';
import { BsDynamicFormInputWrapperComponent } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.component';

@Component({
  selector: 'bs-dynamic-form-file',
  imports: [ReactiveFormsModule, DynamicFormFileDirective, BsDynamicFormInputWrapperComponent],
  templateUrl: './dynamic-form-file.component.html',
})
export class BsDynamicFormFileComponent extends DynamicFormFileBase {
  constructor(
    protected override builder: DynamicFormBuilder,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(builder, validationService);
  }
}
