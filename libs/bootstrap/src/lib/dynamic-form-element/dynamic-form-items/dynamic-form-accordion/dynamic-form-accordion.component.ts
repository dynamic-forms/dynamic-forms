import { Component } from '@angular/core';
import { DynamicFormAccordionBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html'
})
export class BsDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
