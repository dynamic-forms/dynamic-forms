import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormElementsComponent, DynamicFormTabsBase } from '@dynamic-forms/core';

@Component({
  selector: 'mat-dynamic-form-tabs',
  templateUrl: './dynamic-form-tabs.component.html',
  imports: [NgClass, MatTabsModule, DynamicFormElementsComponent],
})
export class MatDynamicFormTabsComponent extends DynamicFormTabsBase {
  constructor() {
    super();
  }
}
