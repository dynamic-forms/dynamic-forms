import { Component, ViewChild, ViewContainerRef, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormItem } from './dynamic-form-item.model';
import { DynamicFormItemFactory } from './dynamic-form-item.factory';

@Component({
  selector: 'dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html'
})
export class DynamicFormItemComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;
  @Input() template: DynamicFormItem;
  @Input() control: FormGroup;
  @Input() model: any;

  constructor(private componentFactory: DynamicFormItemFactory) {}

  ngOnInit() {
    this.initComponent();
  }

  private initComponent(): any {
    this.componentFactory.createComponent(this.viewContainerRef, {
      template: this.template,
      control: this.control,
      model: this.model
    });
  }
}
