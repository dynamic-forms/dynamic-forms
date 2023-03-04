import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormDataPipe } from './form-data.pipe';
import { FormSubmitDialogComponent } from './form-submit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
  ],
  declarations: [
    FormDataPipe,
    FormSubmitDialogComponent,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    FormSubmitDialogComponent,
  ],
})
export class FormSubmitDialogModule {}
