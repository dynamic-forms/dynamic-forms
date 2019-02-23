import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormFieldBase} from './../form-field/form-field.base';
import { FormComponentFactory } from './../form/form-component.factory';
import { FormControlField } from './form-control-field';

@Component({
  selector: 'core-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent extends FormFieldBase<FormControlField> implements OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;

  constructor(private componentFactory: FormComponentFactory) {
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
