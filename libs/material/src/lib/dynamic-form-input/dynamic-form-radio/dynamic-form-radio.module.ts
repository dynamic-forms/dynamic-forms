import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormsModule, DynamicFormConfig } from '@dynamic-forms/core';
import { MatDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const matDynamicFormRadioConfig: DynamicFormConfig = {
  library: 'material',
  inputConfig: {
    types: [
      { type: 'radio', component: MatDynamicFormRadioComponent }
    ]
  }
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    DynamicFormsModule.forChild(matDynamicFormRadioConfig)
  ],
  declarations: [
    MatDynamicFormRadioComponent
  ],
  entryComponents: [
    MatDynamicFormRadioComponent
  ]
})
export class MatDynamicFormRadioModule {}
