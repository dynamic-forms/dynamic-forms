import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'bs-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html',
  imports: [NgClass, DynamicFormElementsComponent],
})
export class BsDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
