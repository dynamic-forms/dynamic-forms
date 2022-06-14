import { ViewContainerRef } from '@angular/core';
import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlWrapperBase<
  TValue = any,
  Input extends DynamicFormInput<TValue> = DynamicFormInput<TValue>,
  Template extends DynamicFormControlTemplate<TValue, Input> = DynamicFormControlTemplate<TValue, Input>,
  Definition extends DynamicFormControlDefinition<TValue, Input, Template> = DynamicFormControlDefinition<TValue, Input, Template>,
  Control extends DynamicFormControl<TValue, Input, Template, Definition> = DynamicFormControl<TValue, Input, Template, Definition>
> extends DynamicFormFieldWrapperBase<TValue, TValue, FormControlBase<TValue>, Template, Definition, Control> {

  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }
}
