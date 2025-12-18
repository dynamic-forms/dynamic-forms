import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicFormSubmit } from '@dynamic-forms/core';
import { FormDataPipe } from './form-data.pipe';

@Component({
  selector: 'app-form-submit-dialog',
  imports: [JsonPipe, MatButtonModule, MatDialogModule, MatTabsModule, FormDataPipe],
  templateUrl: './form-submit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubmitDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FormSubmitDialogComponent>);
  readonly data = inject<DynamicFormSubmit>(MAT_DIALOG_DATA);
}
