import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormComponentFactory } from './../form-component/form-component.factory';
import { FormFieldBase} from './../form-field/form-field.base';
import { FormControlField } from './form-control-field';

@Component({
  selector: 'core-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent extends FormFieldBase<FormControlField> implements OnInit {
  @ViewChild('inputComponent', { read: ViewContainerRef })
  inputComponent: ViewContainerRef;

  constructor(private componentFactory: FormComponentFactory) {
    super();
  }

  get input() { return this.formField.template.input; }

  ngOnInit() {
    this.initInputComponent();
  }

  private initInputComponent() {
    this.componentFactory.createInputComponent(this.inputComponent, this.formField);
  }
}
