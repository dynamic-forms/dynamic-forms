import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFormWrapper } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-control-hints',
  templateUrl: './dynamic-form-control-hints.component.html',
  styleUrls: ['./dynamic-form-control-hints.component.scss']
})
export class BsDynamicFormControlHintsComponent extends DynamicFormWrapper {
  constructor(protected containerRef: ViewContainerRef) {
    super(containerRef);
  }

  get hints() {
    return this.template['hints'];
  }
}
