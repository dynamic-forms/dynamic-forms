import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const matDynamicFormTextareaType: DynamicFormInputType = {
  type: 'textarea',
  component: MatDynamicFormTextareaComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormConfigModule.withInput(matDynamicFormTextareaType)
  ],
  declarations: [
    MatDynamicFormTextareaComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormTextareaComponent
  ],
  entryComponents: [
    MatDynamicFormTextareaComponent
  ]
})
export class MatDynamicFormTextareaModule {}
