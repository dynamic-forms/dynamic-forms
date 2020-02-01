import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DynamicFormConfigModule, DynamicFormElementType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormButtonComponent } from './dynamic-form-button.component';

export const matDynamicFormButtonType: DynamicFormElementType = {
  type: 'button',
  component: MatDynamicFormButtonComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    DynamicFormConfigModule.withElement(matDynamicFormButtonType)
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
