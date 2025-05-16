import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormActionService, DynamicFormButtonBase, DynamicFormColorPipe } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'bs-dynamic-form-button',
  imports: [NgClass, DynamicFormColorPipe, BsDynamicFormDialogComponent],
  templateUrl: './dynamic-form-button.component.html',
})
export class BsDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
