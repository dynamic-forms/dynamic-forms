import { AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldWrapper} from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';

export abstract class DynamicFormWrapper extends DynamicFormFieldWrapper implements AfterViewInit {

  fieldComponent: DynamicFormWrapper | DynamicFormFieldWrapper;

  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(validationService);
  }

  get ref() { return this.containerRef; }

  ngAfterViewInit() {
    const viewRef = this.containerRef.detach(0);
    this.fieldContainer.insert(viewRef);
  }
}
