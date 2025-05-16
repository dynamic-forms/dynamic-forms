import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionService, DynamicFormButtonBase, DynamicFormColorPipe } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'mat-dynamic-form-button',
  imports: [NgClass, DynamicFormColorPipe, MatDynamicFormDialogComponent, MatButtonModule],
  templateUrl: './dynamic-form-button.component.html',
})
export class MatDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
