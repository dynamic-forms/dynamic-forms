import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormSwitchComponent } from './dynamic-form-switch.component';

export const bsDynamicFormSwitchType: DynamicFormInputType = {
  type: 'switch',
  component: BsDynamicFormSwitchComponent,
  wrappers: [ 'errors' ],
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormSwitchType)
  ],
  declarations: [
    BsDynamicFormSwitchComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormSwitchComponent
  ]
})
export class BsDynamicFormSwitchModule {}
