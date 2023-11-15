import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormElementComponent, DynamicFormModalBase } from '@dynamic-forms/core';
import { BsDynamicFormDialogComponent } from '../../dynamic-form-dialog/dynamic-form-dialog.component';

@Component({
  standalone: true,
  selector: 'bs-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  imports: [CommonModule, DynamicFormElementComponent, BsDynamicFormDialogComponent],
})
export class BsDynamicFormModalComponent extends DynamicFormModalBase {
  constructor() {
    super();
  }
}
