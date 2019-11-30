import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControl, DynamicFormFieldWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html'
})
export class BsDynamicFormControlLabelComponent extends DynamicFormFieldWrapperBase<DynamicFormControl> {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }

  get validation() { return this.field.template.validation; }
}
