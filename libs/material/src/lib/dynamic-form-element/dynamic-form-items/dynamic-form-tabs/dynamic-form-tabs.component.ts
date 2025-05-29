import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-tabs',
  imports: [NgClass, MatTabsModule, DynamicFormElementsComponent],
  templateUrl: './dynamic-form-tabs.component.html',
})
export class MatDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
