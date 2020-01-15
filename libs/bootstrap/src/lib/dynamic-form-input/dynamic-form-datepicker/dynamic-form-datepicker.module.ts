import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormConfigModule, DynamicFormInputType } from '@dynamic-forms/core';
import { BsDynamicFormDatepickerComponent } from './dynamic-form-datepicker.component';

export const bsDynamicFormDatepickerType: DynamicFormInputType = {
  library: 'bootstrap',
  type: 'datepicker',
  component: BsDynamicFormDatepickerComponent,
  wrappers: [ 'label', 'hints', 'errors' ]
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFormConfigModule.withInput(bsDynamicFormDatepickerType)
  ],
  declarations: [
    BsDynamicFormDatepickerComponent
  ],
  exports: [
    DynamicFormConfigModule,
    BsDynamicFormDatepickerComponent
  ],
  entryComponents: [
    BsDynamicFormDatepickerComponent
  ]
})
export class BsDynamicFormDatepickerModule {}
