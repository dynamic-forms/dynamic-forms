import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormAddOnsModule } from '../dynamic-form-add-ons/dynamic-form-add-ons.module';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: BsDynamicFormNumberboxComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormNumberboxType),
    BsDynamicFormAddOnsModule,
  ],
  declarations: [
    BsDynamicFormNumberboxComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormNumberboxComponent,
  ],
})
export class BsDynamicFormNumberboxModule {}
