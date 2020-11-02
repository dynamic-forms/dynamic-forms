import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
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
    MatDynamicFormInputWrapperModule,
    DynamicFormConfigModule.withInput(matDynamicFormRadioType)
  ],
  declarations: [
    MatDynamicFormRadioComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormRadioComponent
  ]
})
export class MatDynamicFormRadioModule {}
