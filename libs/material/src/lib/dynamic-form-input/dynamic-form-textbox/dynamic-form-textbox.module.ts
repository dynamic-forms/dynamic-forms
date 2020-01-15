import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { MatDynamicFormTextboxComponent } from './dynamic-form-textbox.component';

export const matDynamicFormTextboxType: DynamicFormInputType = {
  library: 'material',
  type: 'textbox',
  component: MatDynamicFormTextboxComponent
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
