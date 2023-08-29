import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormAccordionBase, DynamicFormElementsComponent } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html',
  imports: [CommonModule, DynamicFormElementsComponent],
})
export class BsDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
