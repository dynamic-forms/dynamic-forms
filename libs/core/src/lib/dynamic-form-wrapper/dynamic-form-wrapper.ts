import { AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormField } from '../dynamic-form-field/dynamic-form-field';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';
import { DynamicFormFieldDefinition } from '../dynamic-form-field/dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from '../dynamic-form-field/dynamic-form-field-template';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';

export abstract class DynamicFormWrapper<Field extends DynamicFormField = DynamicFormField>
  extends DynamicFormFieldBase<AbstractControl, DynamicFormFieldTemplate, DynamicFormFieldDefinition, Field>
    implements AfterViewInit {

  fieldComponent: DynamicFormWrapper<Field> |
    DynamicFormFieldBase<AbstractControl, DynamicFormFieldTemplate, DynamicFormFieldDefinition, Field>;

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
