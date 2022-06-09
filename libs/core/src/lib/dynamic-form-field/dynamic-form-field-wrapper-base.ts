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
  TValue = any, TModel extends TValue = TValue,
  Control extends DynamicFormFieldControl<TValue> = DynamicFormFieldControl<TValue>,
  Template extends DynamicFormFieldTemplate = DynamicFormFieldTemplate,
  Definition extends DynamicFormFieldDefinition<Template> = DynamicFormFieldDefinition<Template>,
  Field extends DynamicFormField<TValue, TModel, Control, Template, Definition> =
    DynamicFormField<TValue, TModel, Control, Template, Definition>
> extends DynamicFormFieldBase<TValue, TModel, Control, Template, Definition, Field> implements AfterViewInit {

  component: DynamicFormFieldBase<TValue, TModel, Control, Template, Definition, Field>;

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
