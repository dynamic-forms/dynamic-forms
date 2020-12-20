import { Component } from '@angular/core';
import { DynamicFormItemsBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html'
})
export class MatDynamicFormTabsComponent extends DynamicFormItemsBase {
  constructor() {
    super();
  }
}
