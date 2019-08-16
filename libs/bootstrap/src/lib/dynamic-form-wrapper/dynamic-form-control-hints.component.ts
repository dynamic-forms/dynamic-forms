import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControl, DynamicFormValidationService, DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-hints',
  templateUrl: './dynamic-form-control-hints.component.html',
  styleUrls: ['./dynamic-form-control-hints.component.scss']
})
export class BsDynamicFormControlHintsComponent extends DynamicFormWrapper<DynamicFormControl> {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }

  get hints() { return this.field.template.hints; }
}
