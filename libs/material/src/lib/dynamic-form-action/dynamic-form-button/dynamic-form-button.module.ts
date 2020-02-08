import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormActionType, DynamicFormConfigModule } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
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
    DynamicFormConfigModule.withAction(matDynamicFormButtonType)
  ],
  declarations: [
    MatDynamicFormButtonComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormButtonComponent
  ],
  entryComponents: [
    MatDynamicFormButtonComponent
  ]
})
export class MatDynamicFormButtonModule {}
