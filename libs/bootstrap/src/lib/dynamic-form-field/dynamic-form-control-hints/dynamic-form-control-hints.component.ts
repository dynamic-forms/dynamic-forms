import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControlHints, DynamicFormControlWrapperBase, DynamicFormValidationService } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-hints',
  templateUrl: './dynamic-form-control-hints.component.html',
})
export class BsDynamicFormControlHintsComponent extends DynamicFormControlWrapperBase {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }

  get hints(): DynamicFormControlHints {
    return this.field.template.hints;
  }

  get hasHints(): boolean {
    return this.hints
      ? (this.hints.hintStart || this.hints.hintEnd) && true
      : false;
  }

  get showHints(): boolean {
    return this.hasHints && !this.showErrors;
  }
}
