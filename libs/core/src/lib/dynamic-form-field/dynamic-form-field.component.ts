import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormFieldWrapper } from './dynamic-form-field-wrapper';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent extends DynamicFormFieldWrapper implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
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
