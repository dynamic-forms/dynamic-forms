import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent extends DynamicFormFieldWrapper<DynamicFormField> implements OnInit {
  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(
    protected validationService: DynamicFormValidationService,
    private componentFactory: DynamicFormComponentFactory
  ) {
    super(validationService);
  }

  ngOnInit() {
    this.initFieldContainer();
  }

  private initFieldContainer() {
    this.componentFactory.createFieldComponent(this.fieldContainer, this.field);
  }
}
