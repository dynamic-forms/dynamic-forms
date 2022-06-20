import { AfterViewInit, Directive, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldBase } from './dynamic-form-field-base';
import { DynamicFormFieldControl } from './dynamic-form-field-control';
import { DynamicFormFieldDefinition } from './dynamic-form-field-definition';
import { DynamicFormFieldTemplate } from './dynamic-form-field-template';

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class DynamicFormFieldWrapperBase<
  Value = any, Model extends Value = Value,
  Control extends DynamicFormFieldControl<Value> = DynamicFormFieldControl<Value>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Value, Template> = DynamicFormFieldDefinition<Value, Template>,
  Field extends DynamicFormField<Value, Model, Control, Template, Definition> =
    DynamicFormField<Value, Model, Control, Template, Definition>
> extends DynamicFormFieldBase<Value, Model, Control, Template, Definition, Field> implements AfterViewInit {

  component: DynamicFormFieldBase<Value, Model, Control, Template, Definition, Field>;

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    protected containerRef: ViewContainerRef,
    protected override validationService: DynamicFormValidationService,
  ) {
    super(validationService);
  }

  get ref(): ViewContainerRef { return this.containerRef; }

  ngAfterViewInit(): void {
    const viewRef = this.containerRef.detach(0);
    this.container.insert(viewRef);
  }
}
