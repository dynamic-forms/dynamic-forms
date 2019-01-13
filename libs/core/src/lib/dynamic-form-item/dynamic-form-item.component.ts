import { Component, ViewChild, ViewContainerRef, OnInit, Input } from '@angular/core';
import { DynamicFormItemFactory } from './dynamic-form-item.factory';
import { DynamicFormField } from './dynamic-form-field.model';

@Component({
  selector: 'dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html'
})
export class DynamicFormItemComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Input() formField: DynamicFormField;

  constructor(private componentFactory: DynamicFormItemFactory) {}

  ngOnInit() {
    this.initComponent();
  }

  private initComponent(): any {
    this.componentFactory.createComponent(this.viewContainerRef, this.formField);
  }
}
