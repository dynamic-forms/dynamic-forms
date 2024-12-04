import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormAccordionBase, DynamicFormElementsComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html',
  imports: [NgClass, MatExpansionModule, DynamicFormElementsComponent],
})
export class MatDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
