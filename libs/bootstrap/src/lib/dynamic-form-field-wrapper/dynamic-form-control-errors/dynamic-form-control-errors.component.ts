import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-errors',
  templateUrl: './dynamic-form-control-errors.component.html'
})
export class BsDynamicFormControlErrorsComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}
