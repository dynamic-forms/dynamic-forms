import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormAccordionBase, DynamicFormElementsComponent } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html',
  imports: [CommonModule, MatExpansionModule, DynamicFormElementsComponent],
})
export class MatDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
