import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-hints',
  templateUrl: './dynamic-form-control-hints.component.html'
})
export class BsDynamicFormControlHintsComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }

  get hints() {
    return this.field.template.hints;
  }

  get hasHints() {
    return this.hints ? this.hints.hintStart || this.hints.hintEnd : false;
  }

  get showHints() {
    return this.hasHints && !this.showErrors;
  }
}
