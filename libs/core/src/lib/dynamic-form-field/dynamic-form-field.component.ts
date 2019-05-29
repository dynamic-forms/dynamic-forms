import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormField } from './dynamic-form-field';
import { DynamicFormFieldBase } from './dynamic-form-field-base';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html'
})
export class DynamicFormFieldComponent extends DynamicFormFieldBase<DynamicFormField> implements OnInit {
  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(private componentFactory: DynamicFormComponentFactory) {
    super();
  }

  ngOnInit() {
    this.initFieldContainer();
  }

  private initFieldContainer() {
    this.componentFactory.createFieldComponent(this.fieldContainer, this.field);
  }
}
