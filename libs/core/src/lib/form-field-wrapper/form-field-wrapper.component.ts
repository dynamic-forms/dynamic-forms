import { Component, ViewChild, ViewContainerRef, OnInit, Input } from '@angular/core';
import { FormFieldFactory } from './../form-field/form-field.factory';
import { FormField } from './../form-field/form-field.model';

@Component({
  selector: 'dynamic-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html'
})
export class FormFieldWrapperComponent implements OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) containerRef: ViewContainerRef;
  @Input() formField: FormField;

  constructor(private componentFactory: FormFieldFactory) {}

  ngOnInit() {
    this.initComponent();
  }

  private initComponent() {
    this.componentFactory.createComponent(this.containerRef, this.formField);
  }
}
