import { Component, OnInit, ViewChild, ViewContainerRef, DoCheck } from '@angular/core';
import { FormControlField } from './form-control.model';
import { FormControlFactory } from './form-control.factory';
import { FormControlInput } from './form-input/form-input.model';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './form-control.component.html'
})
export class FormControlComponent extends FormFieldComponent<FormControlField> implements OnInit, DoCheck {
  @ViewChild('inputComponent', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  constructor(private componentFactory: FormControlFactory) {
    super();
  }

  get input() { return this.formField.template.input; }

  ngOnInit() {
    this.initComponent();
  }

  ngDoCheck() {
    this.formField.update();
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
