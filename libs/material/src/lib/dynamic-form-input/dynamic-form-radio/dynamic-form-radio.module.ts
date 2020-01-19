import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-config/dynamic-form-library';
import { MatDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const matDynamicFormRadioType: DynamicFormInputType = {
  type: 'radio',
  component: MatDynamicFormRadioComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    DynamicFormConfigModule.withInput(matDynamicFormRadioType)
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
