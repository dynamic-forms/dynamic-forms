import { Component } from '@angular/core';
import { DynamicFormAccordionBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html'
})
export class MatDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
