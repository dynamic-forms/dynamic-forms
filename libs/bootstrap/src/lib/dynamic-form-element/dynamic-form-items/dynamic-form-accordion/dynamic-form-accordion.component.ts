import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormAccordionBase, DynamicFormElementsComponent } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-accordion',
  imports: [NgClass, DynamicFormElementsComponent],
  templateUrl: './dynamic-form-accordion.component.html',
})
export class BsDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
