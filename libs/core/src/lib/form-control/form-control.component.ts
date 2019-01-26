import { Component, Input, OnInit, ViewChild, ViewContainerRef, DoCheck } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormControlTemplate, FormControlField } from './form-control.model';
import { FormControlFactory } from './form-control.factory';
import { FormControlInput } from './form-input/form-input.model';

@Component({
  selector: 'dynamic-form-control',
  templateUrl: './form-control.component.html'
})
export class FormControlComponent implements OnInit, DoCheck {
  @ViewChild('inputComponent', { read: ViewContainerRef }) containerRef: ViewContainerRef;
  @Input() formField: FormControlField;

  constructor(private componentFactory: FormControlFactory) {}

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

  get id(): string {
    return this.formField.path;
  }

  get template(): FormControlTemplate {
    return this.formField.template;
  }

  get control(): FormControl {
    return this.formField.control;
  }

  get input(): FormControlInput {
    return this.formField.template.input;
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
