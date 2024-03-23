import { JsonPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormSubmit } from '@dynamic-forms/core';
import { FormDataPipe } from './form-data.pipe';

@Component({
  standalone: true,
  selector: 'app-form-submit-dialog',
  templateUrl: './form-submit-dialog.component.html',
  imports: [JsonPipe, MatButtonModule, MatDialogModule, MatTabsModule, FormDataPipe],
})
export class FormSubmitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FormSubmitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DynamicFormSubmit,
  ) {}
}
