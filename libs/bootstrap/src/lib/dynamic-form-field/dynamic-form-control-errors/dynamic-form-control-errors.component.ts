import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-control-errors',
  templateUrl: './dynamic-form-control-errors.component.html',
})
export class BsDynamicFormControlErrorsComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }
}
