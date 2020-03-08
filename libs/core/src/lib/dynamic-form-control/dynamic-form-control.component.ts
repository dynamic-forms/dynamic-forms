import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormInput } from '../dynamic-form-input/dynamic-form-input';
import { DynamicFormValidationService } from '../dynamic-form-validation/dynamic-form-validation.service';
import { DynamicFormComponentFactory } from '../dynamic-form/dynamic-form-component.factory';
import { DynamicFormControlBase } from './dynamic-form-control-base';
import { DynamicFormControlHints } from './dynamic-form-control-hints';

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

  get input(): DynamicFormInput { return this.field.template.input; }
  get hints(): DynamicFormControlHints { return this.field.template.hints; }

  ngOnInit(): void {
    this.initContainer();
  }

  private initContainer(): void {
    this.componentFactory.createInputComponent(this.container, this.field);
  }
}
