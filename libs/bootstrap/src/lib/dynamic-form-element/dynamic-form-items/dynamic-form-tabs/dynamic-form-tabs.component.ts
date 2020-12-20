import { Component } from '@angular/core';
import { DynamicFormItemsBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html'
})
export class BsDynamicFormTabsComponent extends DynamicFormItemsBase {
  constructor() {
    super();
  }
}
