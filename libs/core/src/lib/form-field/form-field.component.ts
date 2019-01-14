import { Component, ViewChild, ViewContainerRef, OnInit, Input } from '@angular/core';
import { FormFieldFactory } from './form-field.factory';
import { FormField } from './form-field.model';

@Component({
  selector: 'dynamic-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent implements OnInit {
  @Input() formField: FormField;
  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(private componentFactory: FormFieldFactory) {}

  ngOnInit() {
    this.initComponent();
  }

  private initComponent(): any {
    this.componentFactory.createComponent(this.viewContainerRef, this.formField);
  }
}
