import { Component } from '@angular/core';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-tabs',
  imports: [DynamicFormElementsComponent],
  templateUrl: './dynamic-form-tabs.component.html',
})
export class BsDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
