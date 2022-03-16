import { MatDialog } from '@angular/material/dialog';
import { DynamicFormSubmit } from '@dynamic-forms/core';
import { FormSubmitDialogComponent } from './form-submit-dialog.component';

export abstract class FormSubmitBase {
  constructor(protected dialog: MatDialog) {}

  onFormSubmit(data: DynamicFormSubmit): void {
    this.dialog.open(FormSubmitDialogComponent, { data });
  }
}
