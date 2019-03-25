import { AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';

export abstract class DynamicFormWrapper extends DynamicFormFieldBase implements AfterViewInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;

  constructor(protected containerRef: ViewContainerRef) {
    super();
  }

  get ref() { return this.containerRef; }

  ngAfterViewInit() {
    const viewRef = this.containerRef.detach(0);
    this.fieldComponent.insert(viewRef);
  }
}
