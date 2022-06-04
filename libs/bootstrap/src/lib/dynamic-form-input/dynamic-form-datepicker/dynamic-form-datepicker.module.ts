import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { bsDynamicFormLibrary } from '../../dynamic-form-library/dynamic-form-library';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerType: DynamicFormInputType = {
  type: 'datepicker',
  component: BsDynamicFormDatepickerComponent,
  wrappers: [ 'label', 'hints', 'errors' ],
  libraryName: bsDynamicFormLibrary.name,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormDatepickerType),
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
