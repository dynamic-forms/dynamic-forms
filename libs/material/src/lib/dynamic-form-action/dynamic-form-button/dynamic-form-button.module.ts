import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { dynamicFormDialogHandlers, DynamicFormActionModule, DynamicFormActionType,
  DynamicFormConfigModule, DynamicFormElementModule } from '@dynamic-forms/core';
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
    MatDialogModule,
    DynamicFormElementModule,
    DynamicFormConfigModule.withAction(matDynamicFormButtonType),
    DynamicFormActionModule.withHandlers(dynamicFormDialogHandlers)
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
