import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { BsDynamicFormNumberboxComponent } from './dynamic-form-numberbox.component';

export const bsDynamicFormNumberboxType: DynamicFormInputType = {
  type: 'numberbox',
  component: BsDynamicFormNumberboxComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormNumberboxType),
    BsDynamicFormInputWrapperModule,
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
