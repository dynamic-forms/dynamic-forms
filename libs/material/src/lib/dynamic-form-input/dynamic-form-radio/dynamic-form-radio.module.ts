import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormConfig, DynamicFormConfigModule } from '@dynamic-forms/core';
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
    DynamicFormConfigModule.forChild(matDynamicFormRadioConfig)
  ],
  declarations: [
    MatDynamicFormRadioComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormRadioComponent
  ],
  entryComponents: [
    MatDynamicFormRadioComponent
  ]
})
export class MatDynamicFormRadioModule {}
