import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
import { MatDynamicFormSelectComponent } from './dynamic-form-select.component';

export const matDynamicFormSelectConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'select', component: MatDynamicFormSelectComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    DynamicFormConfigModule.forChild(matDynamicFormSelectConfig)
  ],
  declarations: [
    MatDynamicFormSelectComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormSelectComponent
  ],
  entryComponents: [
    MatDynamicFormSelectComponent
  ]
})
export class MatDynamicFormSelectModule {}
