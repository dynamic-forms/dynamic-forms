import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const matDynamicFormTextboxType: DynamicFormInputType = {
  type: 'textbox',
  component: MatDynamicFormTextboxComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormConfigModule.withInput(matDynamicFormTextboxType)
  ],
  declarations: [
    MatDynamicFormTextboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormTextboxComponent
  ],
  entryComponents: [
    MatDynamicFormTextboxComponent
  ]
})
export class MatDynamicFormTextboxModule {}
