import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DynamicFormActionService, DynamicFormColorPipe, DynamicFormIconBase, DynamicFormIconPipe } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-icon',
  templateUrl: './dynamic-form-icon.component.html',
  imports: [
    NgClass,
    NgIf,
    DynamicFormColorPipe,
    DynamicFormIconPipe,
    MatDynamicFormDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class MatDynamicFormIconComponent extends DynamicFormIconBase {
  constructor(protected override actionService: DynamicFormActionService) {
    super(actionService);
  }
}
