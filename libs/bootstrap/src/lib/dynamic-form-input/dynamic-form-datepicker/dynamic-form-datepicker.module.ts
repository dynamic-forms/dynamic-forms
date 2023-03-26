import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormInputWrapperModule } from '../dynamic-form-input-wrapper/dynamic-form-input-wrapper.module';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerType: DynamicFormInputType = {
  type: 'datepicker',
  component: BsDynamicFormDatepickerComponent,
  wrappers: [ 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormDatepickerType),
    BsDynamicFormInputWrapperModule,
  ],
  declarations: [
    BsDynamicFormDatepickerComponent,
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormDatepickerComponent,
  ],
})
export class BsDynamicFormDatepickerModule {}
