import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControlBase } from './dynamic-form-control-base';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent extends DynamicFormControlBase implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  constructor(
    protected componentFactory: DynamicFormComponentFactory,
    protected validationService: DynamicFormValidationService
  ) {
    super(validationService);
  }

  get input() { return this.field.template.input; }
  get hints() { return this.field.template.hints; }

  ngOnInit() {
    this.initContainer();
  }

  private initContainer() {
    this.componentFactory.createInputComponent(this.container, this.field);
  }
}
