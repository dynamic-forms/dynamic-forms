import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormButtonBase, DynamicFormColorPipe } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html',
  imports: [NgClass, DynamicFormColorPipe, BsDynamicFormDialogComponent],
})
export class BsDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
