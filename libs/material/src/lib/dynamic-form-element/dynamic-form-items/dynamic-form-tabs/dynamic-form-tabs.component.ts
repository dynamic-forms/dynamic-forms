import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html',
  imports: [NgClass, NgFor, MatTabsModule, DynamicFormElementsComponent],
})
export class MatDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
