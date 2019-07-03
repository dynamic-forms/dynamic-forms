import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormControl, DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-label',
  templateUrl: './dynamic-form-control-label.component.html',
  styleUrls: ['./dynamic-form-control-label.component.scss']
})
export class BsDynamicFormControlLabelComponent extends DynamicFormWrapper<DynamicFormControl> {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }

  get validation() { return this.field.template.validation; }
}
