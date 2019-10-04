import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControl, DynamicFormValidationService, DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-errors',
  templateUrl: './dynamic-form-control-errors.component.html'
})
export class BsDynamicFormControlErrorsComponent extends DynamicFormWrapper<DynamicFormControl> {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}
