import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html',
  styleUrls: ['./dynamic-form-control-label.component.scss']
})
export class BsDynamicFormControlLabelComponent extends DynamicFormWrapper {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }
}
