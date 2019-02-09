import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormFieldFactory } from './../form-field/form-field.factory';
import { FormField } from './form-field';
import { FormFieldBase } from './form-field.base';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent extends FormFieldBase<FormField> implements OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  constructor(private componentFactory: FormFieldFactory) {
    super();
  }

  ngOnInit() {
    this.initComponent();
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
