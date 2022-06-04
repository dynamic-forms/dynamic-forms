import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { MatDynamicFormToggleComponent } from './dynamic-form-toggle.component';

export const matDynamicFormToggleType: DynamicFormInputType = {
  type: 'toggle',
  component: MatDynamicFormToggleComponent,
  libraryName: matDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDynamicFormInputWrapperModule,
    DynamicFormConfigModule.withInput(matDynamicFormToggleType),
  ],
  declarations: [
    MatDynamicFormToggleComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormToggleComponent,
  ],
})
export class MatDynamicFormToggleModule {}
