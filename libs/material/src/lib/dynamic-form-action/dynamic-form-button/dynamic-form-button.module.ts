import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionModule, DynamicFormActionType,
  DynamicFormConfigModule, DynamicFormElementModule } from '@dynamic-forms/core';
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
    DynamicFormElementModule,
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
  ],
  entryComponents: [
    MatDynamicFormButtonComponent
  ]
})
export class MatDynamicFormButtonModule {}
