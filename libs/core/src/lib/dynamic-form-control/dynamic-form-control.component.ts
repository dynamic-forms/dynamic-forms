import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldWrapper } from '../dynamic-form-field/dynamic-form-field-wrapper';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControl } from './dynamic-form-control';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent extends DynamicFormFieldWrapper<DynamicFormControl> implements OnInit {
  @ViewChild('fieldContainer', { read: ViewContainerRef, static: true })
  fieldContainer: ViewContainerRef;

  constructor(private componentFactory: DynamicFormComponentFactory) {
    super();
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
