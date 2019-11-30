import { ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlWrapperBase extends DynamicFormFieldWrapperBase<
  FormControl, DynamicFormControlTemplate, DynamicFormControlDefinition, DynamicFormControl
> {
  constructor(
    protected containerRef: ViewContainerRef,
    protected validationService: DynamicFormValidationService
  ) {
    super(containerRef, validationService);
  }
}
