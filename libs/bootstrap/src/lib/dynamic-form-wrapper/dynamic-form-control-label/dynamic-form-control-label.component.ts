import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControl, DynamicFormValidationService, DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html'
})
export class BsDynamicFormControlLabelComponent extends DynamicFormWrapper<DynamicFormControl> {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }

  get validation() { return this.field.template.validation; }
}
