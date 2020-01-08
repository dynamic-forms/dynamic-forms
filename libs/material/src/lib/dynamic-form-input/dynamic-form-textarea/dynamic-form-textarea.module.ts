import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { MatDynamicFormTextareaComponent } from './dynamic-form-textarea.component';

export const matDynamicFormTextareaConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'textarea', component: MatDynamicFormTextareaComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DynamicFormsModule.forChild(matDynamicFormTextareaConfig)
  ],
  declarations: [
    MatDynamicFormTextareaComponent
  ],
  entryComponents: [
    MatDynamicFormTextareaComponent
  ]
})
export class MatDynamicFormTextareaModule {}
