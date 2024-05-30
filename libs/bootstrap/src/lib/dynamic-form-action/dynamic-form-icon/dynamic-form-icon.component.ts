import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormColorPipe, DynamicFormIconBase, DynamicFormIconPipe } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html',
  imports: [NgClass, DynamicFormColorPipe, DynamicFormIconPipe, BsDynamicFormDialogComponent],
})
export class BsDynamicFormIconComponent extends DynamicFormIconBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
