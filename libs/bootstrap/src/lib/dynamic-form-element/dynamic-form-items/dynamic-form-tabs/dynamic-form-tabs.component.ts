import { Component } from '@angular/core';
import { DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html',
})
export class BsDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
