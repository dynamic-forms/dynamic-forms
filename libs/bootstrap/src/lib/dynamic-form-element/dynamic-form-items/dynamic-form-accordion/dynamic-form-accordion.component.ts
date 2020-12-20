import { Component } from '@angular/core';
import { DynamicFormItemsBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-accordion',
  templateUrl: './dynamic-form-accordion.component.html'
})
export class BsDynamicFormAccordionComponent extends DynamicFormItemsBase {
  constructor() {
    super();
  }

  toggleItem(index: number): void {
    this.selectItem(index !== this.selectedIndex ? index : undefined);
  }
}
