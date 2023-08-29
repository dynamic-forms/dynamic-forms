import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html',
  imports: [CommonModule, DynamicFormElementsComponent],
})
export class BsDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
