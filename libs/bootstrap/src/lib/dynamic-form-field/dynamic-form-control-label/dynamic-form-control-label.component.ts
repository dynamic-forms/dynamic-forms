import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html'
})
export class BsDynamicFormControlLabelComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }

  get inputId() { return this.field.inputId; }
  get validation() { return this.field.template.validation; }
}
