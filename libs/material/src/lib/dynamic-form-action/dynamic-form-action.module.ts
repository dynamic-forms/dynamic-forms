import { NgModule } from '@angular/core';
import { DynamicFormActionModule } from '@dynamic-forms/core';
import { MatDynamicFormButtonModule } from './dynamic-form-button/dynamic-form-button.module';
import { MatDynamicFormDialogModule } from './dynamic-form-dialog/dynamic-form-dialog.module';
import { MatDynamicFormIconModule } from './dynamic-form-icon/dynamic-form-icon.module';

@NgModule({
  imports: [
    DynamicFormActionModule,
    MatDynamicFormButtonModule,
    MatDynamicFormIconModule,
    MatDynamicFormDialogModule
  ],
  exports: [
    DynamicFormActionModule
  ]
})
export class MatDynamicFormActionModule {}
