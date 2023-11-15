import { ViewContainerRef } from '@angular/core';
import { FormControlBase } from '../dynamic-form-field/dynamic-form-field-control';
import { DynamicFormFieldWrapperBase } from '../dynamic-form-field/dynamic-form-field-wrapper-base';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

export abstract class DynamicFormControlWrapperBase<
  Value = any,
  Input extends DynamicFormInput<Value> = DynamicFormInput<Value>,
  Template extends DynamicFormControlTemplate<Value, Input> = DynamicFormControlTemplate<Value, Input>,
  Definition extends DynamicFormControlDefinition<Value, Input, Template> = DynamicFormControlDefinition<Value, Input, Template>,
  Control extends DynamicFormControl<Value, Input, Template, Definition> = DynamicFormControl<Value, Input, Template, Definition>,
> extends DynamicFormFieldWrapperBase<Value, Value, FormControlBase<Value>, Template, Definition, Control> {
  constructor(
    protected override containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(containerRef, validationService);
  }
}
