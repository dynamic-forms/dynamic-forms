import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { matDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { MatDynamicFormSwitchComponent } from './dynamic-form-switch.component';

export const matDynamicFormSwitchType: DynamicFormInputType = {
  type: 'switch',
  component: MatDynamicFormSwitchComponent,
  libraryName: matDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    DynamicFormConfigModule.withInput(matDynamicFormSwitchType)
  ],
  declarations: [
    MatDynamicFormSwitchComponent
  ],
  exports: [
    DynamicFormConfigModule,
    MatDynamicFormSwitchComponent
  ],
  entryComponents: [
    MatDynamicFormSwitchComponent
  ]
})
export class MatDynamicFormSwitchModule {}
