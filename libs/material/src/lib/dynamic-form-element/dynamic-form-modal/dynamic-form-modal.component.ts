import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementComponent, DynamicFormModalBase } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'mat-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  imports: [NgIf, DynamicFormElementComponent, MatDynamicFormDialogComponent],
})
export class MatDynamicFormModalComponent extends DynamicFormModalBase {}
