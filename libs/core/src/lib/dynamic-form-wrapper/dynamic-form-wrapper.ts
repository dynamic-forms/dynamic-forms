import { AfterViewInit, ViewContainerRef } from '@angular/core';
import { DynamicFormFieldBase } from '../dynamic-form-field/dynamic-form-field-base';

export abstract class DynamicFormWrapper extends DynamicFormFieldBase implements AfterViewInit {
  fieldComponent: ViewContainerRef;
  fieldComponentInstance: any;

  constructor(protected containerRef: ViewContainerRef) {
    super();
  }

  get ref() { return this.containerRef; }

  ngAfterViewInit() {
    // TODO: attach component to view child
  }
}
