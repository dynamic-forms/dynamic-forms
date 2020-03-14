import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFormSubmit } from '@dynamic-forms/core';

@Component({
  selector: 'app-dynamic-form-dialog',
  templateUrl: 'dynamic-form-dialog.component.html',
})
export class DynamicFormDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicFormSubmit) {}
}
