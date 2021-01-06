import { Component } from '@angular/core';
import { DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html'
})
export class MatDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
