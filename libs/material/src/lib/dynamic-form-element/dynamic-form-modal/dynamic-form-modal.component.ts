import { Component } from '@angular/core';
import { DynamicFormElementComponent, DynamicFormModalBase } from '@dynamic-forms/core';
import { MatDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  selector: 'mat-dynamic-form-modal',
  imports: [DynamicFormElementComponent, MatDynamicFormDialogComponent],
  templateUrl: './dynamic-form-modal.component.html',
})
export class MatDynamicFormModalComponent extends DynamicFormModalBase {}
