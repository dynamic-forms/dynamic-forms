import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormComponentFactory } from './../form-component/form-component.factory';
import { FormField } from './form-field';
import { FormFieldBase } from './form-field.base';

@Component({
  selector: 'core-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent extends FormFieldBase<FormField> implements OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;

  constructor(private componentFactory: FormComponentFactory) {
    super();
  }

  ngOnInit() {
    this.initFieldComponent();
  }

  private initFieldComponent() {
    this.componentFactory.createFieldComponent(this.fieldComponent, this.field);
  }
}
