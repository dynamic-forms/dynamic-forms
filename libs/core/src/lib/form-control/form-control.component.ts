import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormFieldBase} from '../form-field/form-field.base';
import { FormControlField } from './form-control-field';
import { FormControlFactory } from './form-control.factory';

@Component({
  selector: 'core-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent extends FormFieldBase<FormControlField> implements OnInit {
  @ViewChild('inputComponent', { read: ViewContainerRef })
  containerRef: ViewContainerRef;

  constructor(private componentFactory: FormControlFactory) {
    super();
  }

  get input() { return this.formField.template.input; }

  ngOnInit() {
    this.initComponent();
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
