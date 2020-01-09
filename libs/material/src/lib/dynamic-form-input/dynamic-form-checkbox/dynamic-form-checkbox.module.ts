import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { MatDynamicFormCheckboxComponent } from './dynamic-form-checkbox.component';

export const matDynamicFormCheckboxConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'checkbox', component: MatDynamicFormCheckboxComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    DynamicFormConfigModule.forChild(matDynamicFormCheckboxConfig)
  ],
  declarations: [
    MatDynamicFormCheckboxComponent
  ],
  entryComponents: [
    MatDynamicFormCheckboxComponent
  ]
})
export class MatDynamicFormCheckboxModule {}
