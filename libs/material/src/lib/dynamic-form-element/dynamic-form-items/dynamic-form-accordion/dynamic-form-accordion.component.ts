import { Component } from '@angular/core';
import { DynamicFormItemsBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html'
})
export class MatDynamicFormAccordionComponent extends DynamicFormItemsBase {
  constructor() {
    super();
  }

  openItem(index: number): void {
    this.selectItem(index);
  }

  closeItem(index: number): void {
    if (this.selectedIndex === index) {
      this.selectItem(undefined);
    }
  }
}
