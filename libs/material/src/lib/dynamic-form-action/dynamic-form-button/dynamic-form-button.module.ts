import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionModule, DynamicFormActionType, DynamicFormConfigModule } from '@dynamic-forms/core';
import { MatDynamicFormDialogModule } from '../../dynamic-form-dialog/dynamic-form-dialog.module';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormButtonComponent } from './dynamic-form-button.component';

export const matDynamicFormButtonType: DynamicFormActionType = {
  type: 'button',
  component: MatDynamicFormButtonComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicFormActionModule,
    DynamicFormConfigModule.withAction(matDynamicFormButtonType),
    MatDynamicFormDialogModule
  ],
  declarations: [
    MatDynamicFormButtonComponent
  ],
  exports: [
    DynamicFormConfigModule,
    DynamicFormActionModule,
    MatDynamicFormButtonComponent
  ]
})
export class MatDynamicFormButtonModule {}
