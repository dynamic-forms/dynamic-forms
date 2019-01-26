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
  @ViewChild('inputComponent', { read: ViewContainerRef }) containerRef: ViewContainerRef;

  constructor(private componentFactory: FormControlFactory) {
    super();
  }

  ngOnInit() {
    this.initComponent();
  }

  ngDoCheck() {
    const disabled = this.input.disabled || false;
    if (this.control.disabled !== disabled) {
      if (disabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }

  get input(): FormControlInput {
    return this.formField.template.input;
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
