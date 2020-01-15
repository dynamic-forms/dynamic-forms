import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { MatDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const matDynamicFormCheckboxType: DynamicFormInputType = {
  library: 'material',
  type: 'checkbox',
  component: MatDynamicFormCheckboxComponent
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    DynamicFormConfigModule.withInput(matDynamicFormCheckboxType)
  ],
  declarations: [
    MatDynamicFormCheckboxComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormCheckboxComponent
  ],
  entryComponents: [
    MatDynamicFormCheckboxComponent
  ]
})
export class MatDynamicFormCheckboxModule {}
