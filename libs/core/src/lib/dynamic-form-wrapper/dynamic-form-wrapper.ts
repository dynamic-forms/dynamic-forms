import { AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldWrapper} from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';

export abstract class DynamicFormWrapper<
  Field extends DynamicFormField = DynamicFormField
> extends DynamicFormFieldWrapper<Field> implements AfterViewInit {

  fieldComponent: DynamicFormWrapper<Field> | DynamicFormFieldWrapper<Field>;

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
