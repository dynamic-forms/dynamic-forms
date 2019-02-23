import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldBase } from './../dynamic-form-field/dynamic-form-field.base';
import { DynamicFormComponentFactory } from './../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControl } from './dynamic-form-control';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss']
})
export class DynamicFormControlComponent extends DynamicFormFieldBase<DynamicFormControl> implements OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;

  constructor(private componentFactory: DynamicFormComponentFactory) {
    super();
  }

  get input() { return this.field.template.input; }

  ngOnInit() {
    this.initInputComponent();
  }

  private initInputComponent() {
    this.componentFactory.createInputComponent(this.fieldComponent, this.field);
  }
}
