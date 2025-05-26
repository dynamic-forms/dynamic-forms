import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DynamicFormAccordionBase, DynamicFormElementsComponent } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-accordion',
  imports: [NgClass, MatExpansionModule, DynamicFormElementsComponent],
  templateUrl: './dynamic-form-accordion.component.html',
})
export class MatDynamicFormAccordionComponent extends DynamicFormAccordionBase {
  constructor() {
    super();
  }
}
