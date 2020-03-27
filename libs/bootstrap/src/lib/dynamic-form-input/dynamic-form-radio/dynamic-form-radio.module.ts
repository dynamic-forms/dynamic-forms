import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormRadioComponent } from './dynamic-form-radio.component';

export const bsDynamicFormRadioType: DynamicFormInputType = {
  type: 'radio',
  component: BsDynamicFormRadioComponent,
  wrappers: [ 'label', 'errors' ],
  libraryName: bsDynamicFormLibrary.name
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormRadioType)
  ],
  declarations: [
    BsDynamicFormRadioComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormRadioComponent
  ]
})
export class BsDynamicFormRadioModule {}
