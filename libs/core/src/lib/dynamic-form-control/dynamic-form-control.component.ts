import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormControlDefinition } from './dynamic-form-control-definition';
import { DynamicFormControlTemplate } from './dynamic-form-control-template';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent extends DynamicFormFieldWrapper<FormControl,
  DynamicFormControlTemplate, DynamicFormControlDefinition, DynamicFormControl> implements OnInit {

  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(
    protected componentFactory: DynamicFormComponentFactory,
    protected validationService: DynamicFormValidationService
  ) {
    super(validationService);
  }

  get input() { return this.field.template.input; }
  get hints() { return this.field.template.hints; }

  ngOnInit() {
    this.initFieldContainer();
  }

  private initFieldContainer() {
    this.componentFactory.createInputComponent(this.fieldContainer, this.field);
  }
}
