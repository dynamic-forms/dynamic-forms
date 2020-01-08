import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { MatDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const matDynamicFormDatepickerConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'datepicker', component: MatDynamicFormDatepickerComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DynamicFormsModule.forChild(matDynamicFormDatepickerConfig)
  ],
  declarations: [
    MatDynamicFormDatepickerComponent
  ],
  entryComponents: [
    MatDynamicFormDatepickerComponent
  ]
})
export class MatDynamicFormDatepickerModule {}
