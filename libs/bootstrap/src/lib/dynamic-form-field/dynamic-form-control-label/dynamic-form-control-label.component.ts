import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlValidation, DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html',
})
export class BsDynamicFormControlLabelComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }

  get inputId(): string {
    return this.field.inputId;
  }

  get validation(): DynamicFormControlValidation {
    return this.field.template.validation;
  }
}
