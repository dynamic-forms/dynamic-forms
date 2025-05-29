import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormColorPipe, DynamicFormIconBase, DynamicFormIconPipe } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'bs-dynamic-form-icon',
  imports: [NgClass, DynamicFormColorPipe, DynamicFormIconPipe, BsDynamicFormDialogComponent],
  templateUrl: './dynamic-form-icon.component.html',
})
export class BsDynamicFormIconComponent extends DynamicFormIconBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
