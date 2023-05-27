import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionService, DynamicFormButtonBase, DynamicFormColorPipe } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-button',
  templateUrl: './dynamic-form-button.component.html',
  imports: [CommonModule, DynamicFormColorPipe, MatDynamicFormDialogComponent, MatButtonModule],
})
export class MatDynamicFormButtonComponent extends DynamicFormButtonBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
